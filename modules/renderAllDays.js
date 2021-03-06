function renderAllDays(initialDate){
    function getAllDays(){
        function getLastDateOfMonth() {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            date.setDate(0)

            return date;
        }

        const allDays = [];
        const date = new Date(initialDate);
        const currentMonth = date.getMonth();
        date.setDate(1)
        const firstDayOfTheMonth = date.getDay(); // 3
        const lastDayOfTheMonth = getLastDateOfMonth().getDay(); // 1

        for (let day = 0; day < firstDayOfTheMonth; day++) {
            const temporalDate = new Date(initialDate);
            temporalDate.setDate(day-firstDayOfTheMonth + 1);
            const prevDate = temporalDate.getTime();
            allDays.push(prevDate);
        };

        while(date.getMonth() === currentMonth) {
            const currentDate = date.getTime();
            allDays.push(currentDate);
            date.setDate(
                date.getDate() + 1
            );
        }

        for (let day = 0; day < 6 - lastDayOfTheMonth; day++) {
            const temporalDate = new Date(initialDate);
            const lastDateOfMonth = getLastDateOfMonth().getDate();
            temporalDate.setDate(lastDateOfMonth + day + 1);
            const nextDate = temporalDate.getTime();
            allDays.push(nextDate);
        };


        return allDays;
    }

    function insertAllDaysInHTML(allDays){
        function wrapDayInHTML(time){
            const timeDate = new Date(time);
            const nowDate = new Date();
            const initialDateCopy = new Date(initialDate);
            const isPrevDate = timeDate.getMonth() < initialDateCopy.getMonth();
            const isNextDate = timeDate.getMonth() > initialDateCopy.getMonth();
            const isTodayDate = timeDate.getDate() === nowDate.getDate() && timeDate.getMonth() === nowDate.getMonth();

            const day = timeDate.getDate()

            if(isTodayDate === true){
                return `<div class="today">${day}</div>`
            }

            if (isPrevDate === true){
                return `<div class="prev-date">${day}</div>`
            }

            if (isNextDate === true){
                return `<div class="next-date">${day}</div>`
            }
            
            return `<div>${day}</div>`
        }
        const daysElement = document.getElementById("days");
        daysElement.innerHTML = allDays.map(wrapDayInHTML).join("");
    };

    const allDays = getAllDays();
    insertAllDaysInHTML(allDays);
}


export default renderAllDays;
