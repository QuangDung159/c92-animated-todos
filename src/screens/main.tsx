import { AntDesign } from '@expo/vector-icons';
import { Center, Fab, Icon, useColorModeValue, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import shortid from 'shortid';
import TaskList, { TaskItemData } from 'components/task-list';
import ThemeToggle from 'components/theme-toggle';

const initialData: TaskItemData[] = [
  {
    id: shortid.generate(),
    done: true,
    subject: 'Task 1',
  },
  {
    id: shortid.generate(),
    done: false,
    subject: 'Task 2',
  },
];

function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleToggleTaskItem = useCallback((item: TaskItemData) => {
    setData((prev) => {
      const newData = [...prev];
      const index = prev.indexOf(item);
      newData[index] = { ...item, done: !item.done };

      return newData;
    });
  }, []);

  const handleChangeTaskItemSubject = useCallback(
    (item: TaskItemData, newSubject: string) => {
      setData((prev) => {
        const newData = [...prev];
        const index = prev.indexOf(item);
        newData[index] = { ...item, subject: newSubject };

        return newData;
      });
    },
    [],
  );

  const handleRemoveItem = useCallback((item: TaskItemData) => {
    setData((prev) => {
      const newData = prev.filter((i) => i !== item);

      return newData;
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFinishEditingTaskItem = useCallback((_item: TaskItemData) => {
    setEditingItemId(null);
  }, []);

  const handlePressTaskItemLabel = useCallback((item: TaskItemData) => {
    setEditingItemId(item.id);
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
        <TaskList
          data={data}
          onPressLabel={handlePressTaskItemLabel}
          onFinishEditing={handleFinishEditingTaskItem}
          editingItemId={editingItemId}
          onChangeSubject={handleChangeTaskItemSubject}
          onToggleItem={handleToggleTaskItem}
          onRemoveItem={handleRemoveItem}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position={'absolute'}
        renderInPortal={false}
        size={'sm'}
        icon={<Icon color={'white'} as={<AntDesign name="plus" />} />}
        bg={useColorModeValue('blue.500', 'blue.400')}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        onPress={() => {
          const id = shortid.generate();
          setData([
            {
              id,
              subject: '',
              done: false,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
    </Center>
  );
}

export default MainScreen;
