function CalendarDays(props) {
  let firstDayOfMonth = new Date(
    props.day.getFullYear(),
    props.day.getMonth(),
    1
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays;
  if (localStorage.getItem("currentDays") == null) {
    currentDays = [];
  } else {
    if (JSON.parse(localStorage.getItem("currentDays")).length === 42) {
      currentDays = JSON.parse(localStorage.getItem("currentDays"));
    }
  }
  // let currentDays = [];
  let mockevents = props.mockevents;

  if (currentDays.length !== 42) {
    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(
          firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
        );
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
        date: new Date(firstDayOfMonth),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
        year: firstDayOfMonth.getFullYear(),
      };

      currentDays.push(calendarDay);
      localStorage.setItem("currentDays", JSON.stringify(currentDays));
    }
  }

  const getDateObj = (day, month, year) => {
    return new Date(year, month, day);
  };
  const areDatesTheSame = (first, second) => {
    second = new Date(second);

    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  };

  const getRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  };

  return (
    <div className="table-content">
      {currentDays.map((day) => {
        return (
          <div
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() =>
              props.onAddEvent(
                day,
                getDateObj(day.number, day.month, day.year),
                mockevents,
                getRandomColor()
              )
            }
          >
            <p>{day.number}</p>

            {mockevents.map(
              (ev) =>
                areDatesTheSame(
                  getDateObj(day.number, day.month, day.year),
                  ev.date
                ) && (
                  <span
                    className="event"
                    style={{ backgroundColor: ev.color }}
                    onClick={(e) => props.onShowPortal(e, ev)}
                  >
                    {ev.name} <br />
                    {ev.time} <br />
                    {ev.email}
                  </span>
                )
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarDays;
