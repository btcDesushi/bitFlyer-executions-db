const bitflyer = require('bitflyer-promise');
const MongoClient = require('mongodb').MongoClient;

const mongodbUrl = 'mongodb://localhost:27020/bitflyer';

let dataCount = 0 ;
let apiCount = 1;
let minimumId = 999999999999;
let indbCount = 0;

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

(async function main() {
    console.log('MongoDB へ 接続中...');
    const db = await MongoClient.connect(mongodbUrl).catch( function(err){
        console.error(err);
        console.log('接続エラー');
        process.exit();
    });

    const collection = db.collection('executions');
    collection.createIndex({id:1});
    collection.createIndex({exec_date:1});

    console.log('過去約定データを取得中...');
    let executions = await bitflyer.executions({product_code: 'FX_BTC_JPY', count: 500}).catch(function(err){
        console.error(err);
        console.log('BF API呼び出しエラー');
        db.close();
        process.exit();
    });
    console.log(executions.length);

    console.log('過去約定データをDBに追加...');
    while( executions.length != 0 ) {
        indbCount = 0;
        for(let k in executions) {
            if( executions[k].id < minimumId) {
                minimumId = executions[k].id;
            }
            if( await collection.count({id: executions[k].id}) == 0 ) {
                delete executions[k]._id;
                await collection.insertOne(executions[k]).catch( function(err){
                    console.error(err);
                    console.log('過去約定データ追加エラー');
                    console.log(executions[k]);
                    db.close();
                    process.exit();
                });
                console.log('database insert ID:' + executions[k].id);
                dataCount++;
            } else {
                console.log('過去約定データ重複スキップ');
                indbCount++;
            }
        }
        if(indbCount == executions.length) {
            console.log('新規取得データが全て取得済みだったため終了します');
            db.close();
            process.exit();
        }
        console.log('DB保存データ数：' + dataCount);

        console.log(minimumId);
        let error = false
        do {
            executions = await bitflyer.executions({product_code: 'FX_BTC_JPY', count: 500, before: minimumId}).catch(async function(err){
                console.error(err);
                console.log('BF API呼び出しエラー');
                error = true
                await sleep(10000);
            })
        } while(error)
        apiCount++;
        console.log('API呼び出し回数：' + apiCount);
        console.log('取得データ数：' + executions.length);
        await sleep(500);
    }
    db.close();
})();
