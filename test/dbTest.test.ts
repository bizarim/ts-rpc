import { expect } from 'chai';

import { IDto, IUpResult, DtoTest, UrtTest } from '../src/models';
import { eErrorCode, eDbEnum } from '../src/enums';
import { DbQuery, PoolConnection, NTExector, Pool, DbPools } from '../src/database';
import { ILogger } from '../src/logger/ILogger';

describe('dbTest.test', function () {

    it('개발 서버 접속 및 테스트 프로시저 호출', async function () {

        // const testPool = new DbPools();
        // await testPool.initialize({
        //     'dbs': {
        //         'test': {
        //             'host': '192.168.4.54',
        //             'port': 3306,
        //             'user': 'root',
        //             'password': 'Qwewe11!!',
        //             'database': 'testdb',
        //             'connectionLimit': 1,
        //             'waitForConnections': true,
        //             'queueLimit': 0,
        //             'multipleStatements': true,
        //             'dateStrings': true
        //         }
        //     }
        // });

        // const pool: Pool = testPool.getPool(eDbEnum.test) as Pool;
        // const usp = new UpTest(pool);
        // const urt = await usp.execute();
        // const conn = await pool.getConnection();
        // conn.destroy();
        // expect(urt.errcode).to.equal(eErrorCode.Success);

    });

});

class TestQuery extends DbQuery {
    constructor() { super(); }
    async test(conn: PoolConnection, accIdx: number): Promise<Array<IDto>> {
        const query = 'SELECT c1, c2, c3 FROM tTest';
        const [rows] = await conn.query(query);
        const list: Array<DtoTest> = this.deepCopy(rows);
        return list;
    }
}

class UpTest extends NTExector {
    logger: ILogger;
    query: TestQuery;
    constructor(pool: Pool) {
        super(pool);
        this.query = new TestQuery();
    }

    release(): void {
        this.query.release();
    }

    async onQuery(conn: PoolConnection): Promise<IUpResult> {
        const result = new UrtTest();
        result.errcode = eErrorCode.Success;
        result.list = await this.query.test(conn, 1);
        return result;
    }
}

