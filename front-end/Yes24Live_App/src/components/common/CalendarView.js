import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarView({ onDateSelect }) {
  const getTodayDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString);
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default CalendarView;
