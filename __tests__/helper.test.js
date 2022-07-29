const {format_date, format_plural} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2022-07-29 16:12:03');

    expect(format_date(date)).toBe('7/29/2022');
});

test('format_plural() returns a pluralized word', () => {
    
    expect(format_plural('Tiger', 2)).toEqual('Tigers');
    expect(format_plural('Bear', 0)).toEqual('Bears');
});

test('format_plural() returns a singular word', () => {
    
    expect(format_plural('Lion', 1)).toEqual('Lion');
});