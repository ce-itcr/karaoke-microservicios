const { assertStrictEquality } = require('../shared/utils/testing');
const { getConnection } = require('../shared/connection');

describe('MongoDb Connection' , () => {
    it('getConnection', () => {
        const databaseConnection = getConnection();
        assertStrictEquality(databaseConnection, 'KaraokeDB');
    })

})


