import React, { useContext, useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import CalendarView from '../../components/common/CalendarView';
import Task from '../../components/common/Task';
import { theme } from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
//import { TaskService } from '../../services/TaskService';

export default function ScheduleScreen({ navigation }) {
  const getTodayDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

  // 일정 관련 변수
  const [task, setTask] = useState({
    listId: null,
    date: today,
    content: '',
  });
  const [taskItems, setTaskItems] = useState({
    '2023-10-10': [
      {
        listId: 1,
        content: '첫 번째 공연 일정',
      },
      {
        listId: 2,
        content: '두 번째 공연 일정',
      },
    ],
  });
  const [selectedOption, setSelectedOption] = useState(1);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  //const { user } = useContext(UserContext);
  //const jwt = user.jwt;

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${year}년 ${month}월 ${day}일`;
  };

  return (
    <View style={styles.container}>
      <AppHeader
        name="arrow-back-outline"
        header={'공연일정 안내'}
        action={() => navigation.goBack()}
      />
      <CalendarView onDateSelect={handleDateSelect} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
          textAlign: 'center',
        }}>
        {formatDate(selectedDate)}
      </Text>
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {(taskItems[selectedDate] || []).map((item, index) => (
            <TouchableOpacity key={index}>
              <Task task={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  switchWrapper: {
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  items: {},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderColor: '#D1D1D1',
    borderWidth: 1,
    width: '90%',
    height: 40,
  },
  floatingButton: {
    backgroundColor: theme.btnBackground,
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 30,
  },
  recordWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  recordTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  recordAvgItem: {
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  recordItem: {
    padding: 10,
    marginBottom: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ccc',
    borderColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  individualRecord: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  detailText: {
    color: 'gray',
    textAlign: 'right',
  },
});
