import { Center, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import TaskItem from 'components/task-item';
import ThemeToggle from 'components/theme-toggle';

function MainScreen() {
  const [checked, setChecked] = useState(false);
  const [subject, setSubject] = useState('Task item');
  const [isEditing, setIsEditing] = useState(false);

  const handlePressCheckbox = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <Center
      _dark={{
        bg: 'blueGray.900',
      }}
      _light={{
        bg: 'blueGray.50',
      }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w={'full'}>
        <TaskItem
          isEditing={isEditing}
          isDone={checked}
          onToggleCheckbox={handlePressCheckbox}
          subject={subject}
          onChangeSubject={setSubject}
          onPressLabel={() => setIsEditing(true)}
          onFinishEditing={() => setIsEditing(false)}
        />
        <ThemeToggle />
      </VStack>
    </Center>
  );
}

export default MainScreen;
