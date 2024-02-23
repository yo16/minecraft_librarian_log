
const getItemStatistics = (item, level, price) => {
    
    return {
        item: "aa",
        level: 123,
        price: 456,
        average: 3.14,
        standard_deviation: 15.92,
        probability: 0.65,
    };
};

const setItemStatistics = (
    item1, level1, price1,
    item2, level2, price2,
) => {
    return [
        {
            item: "aa",
            level: 123,
            price: 456,
            average: 3.14,
            standard_deviation: 15.92,
            probability: 0.65,
        },
        {
            item: "bb",
            level: 123,
            price: 456,
            average: 3.14,
            standard_deviation: 15.92,
            probability: 0.65,
        },
    ];
}

export {
    getItemStatistics,
    setItemStatistics,
};

