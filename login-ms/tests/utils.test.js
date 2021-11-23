const { jsonConcat, getFullDate } = require('../shared/utils/utils');
const { assertStrictEquality } = require('../shared/utils/testing');

describe('Local Functions' , () => {
    it('jsonConcat', function() {
        assertStrictEquality(jsonConcat({'firstName':'John'},{'lastName':'Doe'}), {'firstName':'John','lastName':'Doe'});
    })

    it('getFullData', () => {
        assertStrictEquality(getFullDate(), getFullDate());
    })
})


