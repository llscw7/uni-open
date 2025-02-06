const compareDate = (data1: number, data2: number) => {
    const date1 = new Date(data1);

    const year1 = date1.getFullYear();
    const month1 = date1.getMonth() + 1; 
    const day1 = date1.getDate(); 
    
    const date2 = new Date(data2);

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth() + 1; 
    const day2 = date2.getDate();

    if(year1 === year2 && month1 === month2 && day1 === day2) {
        return 0
    }

    return 1

}

const formatData = (data: DetailDataItem[]): DetailData[] => {
    const arr = []
    let l = 0;
    let r = 1;
    console.log( typeof data[l].time, '----222',  new Date(data[l].time))

    while(l < r) {
        if(!data[r]) break;

        const flag = compareDate(data[l].time, data[r].time)

        if(!flag) {
            r++
        }
        else {
            arr.push({
                date: data[l].date,
                year: data[l].year,
                month: data[l].month,
                day: data[l].day,
                time: data[l].time,
                weekdayCN: data[l].weekdayCN,
                children: [
                    ...data.slice(l, r)
                ]
            })
            l = r
            r++
        }
    }
    if(r > l) {
        arr.push({
            date: data[l].date,
            year: data[l].year,
            month: data[l].month,
            day: data[l].day,
            time: data[l].time,
            weekdayCN: data[l].weekdayCN,
            children: [
                ...data.slice(l, r)
            ]
        })
    }
    return arr;
}

export {
    formatData,
}