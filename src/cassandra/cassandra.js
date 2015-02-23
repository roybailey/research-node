var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['localhost']});


client.connect(function (err, result) {
    if (err) {
        console.log('Connection Failed: ' + JSON.stringify(err));
    } else {
        console.log('Connected: ' + JSON.stringify(result));
        dropKeyspace();
    }
});


var dropKeyspace = function () {
    var cqlDropKeyspace = "DROP KEYSPACE IF EXISTS nodespace";

    client.execute(cqlDropKeyspace, null, function (err, result) {
        if (err) {
            console.log('Drop Keyspace Failed: ' + JSON.stringify(err));
        } else {
            console.log('Dropped Keyspace: ' + JSON.stringify(result));
            createKeyspace();
        }
    });
};


var createKeyspace = function () {
    var cqlCreateKeyspace =
        "CREATE KEYSPACE IF NOT EXISTS nodespace" +
        " WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 1}";

    client.execute(cqlCreateKeyspace, null, function (err, result) {
        if (err) {
            console.log('Create Keyspace Failed: ' + JSON.stringify(err));
        } else {
            console.log('Created Keyspace: ' + JSON.stringify(result));
            createColumnFamily();
        }
    });
};


var createColumnFamily = function () {
    var cqlCreateColumnFamily =
        "CREATE TABLE nodespace.sample (" +
        "primaryRowKey text," +
        "secondaryRowKey text," +
        "primaryColumnKey timeuuid," +
        "secondaryColumnKey text," +
        "atime timestamp," +
        "aboolean boolean," +
        "abigint bigint," +
        "auuid uuid," +
        "adouble double," +
        "adecimal decimal," +
        "aset set<text>," +
        "amap map<text,text>," +
        "alist list<text>," +
        "ablob blob," +
        "PRIMARY KEY ((primaryRowKey, secondaryRowKey), primaryColumnKey, secondaryColumnKey)" +
        ")";

    client.execute(cqlCreateColumnFamily, null, function (err, result) {
        if (err) {
            console.log('Create ColumnFamily Failed: ' + JSON.stringify(err));
        } else {
            console.log('Created ColumnFamily: ' + JSON.stringify(result));
            insertData();
        }
    });
};


var insertData = function () {
    var cqlInsertSampleData =
        "INSERT INTO nodespace.sample (" +
        "   primaryRowKey, secondaryRowKey, " +
        "   primaryColumnKey, secondaryColumnKey," +
        "   atime, aboolean, abigint," +
        "   auuid, adouble, adecimal," +
        "   aset, amap, alist" +
        ") VALUES (?,?, ?,?, ?,?,?, ?,?,?, ?,?,?)";

    var aset = ["abc", "def", "ghi"];
    var alist = ["xxx", "jjj", "ttt"];
    var amap = {"key1": "value1", "key2": "value2"};

    client.execute(
        cqlInsertSampleData,
        [   'row1', 'part1', cassandra.types.timeuuid(), 'columnGroup',
            new Date(), true, new cassandra.types.Long.fromString("876543210987654321"),
            cassandra.types.uuid(), 1.5, 1.1234567890123456789,
            aset, amap, alist
        ],
        {hints: [
            null, null, null, null,
            null, null, null,
            null, null, null,
            null, 'map', null
        ]},
        function (err, result) {
            if (err) {
                console.log('Insert Sample Data Failed: ' + JSON.stringify(err));
                // needed to add this to get the error message as sometimes stringify didn't include it
                console.log('Insert Sample Data Failed: ' + err.message);
                process.exit(0);
            } else {
                console.log('Inserted Sample Data: ' + JSON.stringify(result));
                selectData();
            }
        }
    );
};


var selectData = function () {
    var cqlSelectSampleData =
        "SELECT * FROM nodespace.sample " +
        "WHERE primaryRowKey = ? and secondaryRowKey = ?";

    client.execute(
        cqlSelectSampleData, ['row1','part1'],
        function (err, result) {
            if (err) {
                console.log('Select Sample Data Failed: ' + JSON.stringify(err));
                console.log('Select Sample Data Failed: ' + err.message);
            } else {
                console.log('Selected Sample Data: ' + JSON.stringify(result.rows[0]));
                // notice the names are all lowercase
                console.log('primaryRowKey      : ' + result.rows[0]['primaryrowkey']);
                console.log('secondaryRowKey    : ' + result.rows[0]['secondaryrowkey']);
                console.log('primaryColumnKey   : ' + result.rows[0]['primarycolumnkey']);
                console.log('secondaryColumnKey : ' + result.rows[0]['secondarycolumnkey']);

                console.log('atime              : ' + new Date(result.rows[0]['atime']));
                console.log('aboolean           : ' + result.rows[0]['aboolean']);
                console.log('abigint            : ' + result.rows[0]['abigint']);

                console.log('auuid              : ' + result.rows[0]['auuid']);
                console.log('adecimal           : ' + result.rows[0]['adecimal'].readDoubleBE(0));
                console.log('adouble            : ' + result.rows[0]['adouble']);

                console.log('aset               : ' + result.rows[0]['aset']);
                console.log('amap               : ' + JSON.stringify(result.rows[0]['amap']));
                console.log('alist              : ' + result.rows[0]['alist']);
                process.exit(0);
            }
        }
    );
};

