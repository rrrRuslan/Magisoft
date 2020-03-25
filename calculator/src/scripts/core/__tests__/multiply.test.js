import multiply from '../multiply';

describe('Multiply test', () => {

  it('Multiplies 2 numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6)
  })

});
