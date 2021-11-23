const { assertStrictEquality } = require('../shared/utils/testing');
const { isCorrectPassword } = require('../shared/auth/auth.functions');

describe('Auth Functions' , () => {
    it('isCorrectPassword', () => {
        assertStrictEquality(isCorrectPassword('asdfghj','asdfghj'), true);
    })

})


