import { AnimatePresence, View } from 'moti';
import React, { useCallback, useRef } from 'react';
import {
  PanGestureHandlerProps,
  ScrollView,
} from 'react-native-gesture-handler';
import { makeStyledComponent } from 'utils/styled';
import TaskItem from './task-item';

const StyledView = makeStyledComponent(View);
const StyledScrollView = makeStyledComponent(ScrollView);

export interface TaskItemData {
  id: string;
  subject: string;
  done: boolean;
}

interface TaskListProps {
  data: Array<TaskItemData>;
  editingItemId: string | null;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, newSubject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
  onRemoveItem: (item: TaskItemData) => void;
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData;
  isEditing: boolean;
  onToggleItem: (item: TaskItemData) => void;
  onChangeSubject: (item: TaskItemData, newSubject: string) => void;
  onFinishEditing: (item: TaskItemData) => void;
  onRemove: (item: TaskItemData) => void;
  onPressLabel: (item: TaskItemData) => void;
}

export const AnimatedTaskItem = ({
  simultaneousHandlers,
  data,
  isEditing,
  onChangeSubject,
  onFinishEditing,
  onRemove,
  onToggleItem,
  onPressLabel,
}: TaskItemProps) => {
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data);
  }, [data, onToggleItem]);

  const handleChangeSubject = useCallback(
    (subject: string) => {
      onChangeSubject(data, subject);
    },
    [data, onChangeSubject],
  );

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data);
  }, [data, onFinishEditing]);

  const handlePressLabel = useCallback(() => {
    onPressLabel(data);
  }, [data, onPressLabel]);

  const handleRemove = useCallback(() => {
    onRemove(data);
  }, [data, onRemove]);

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46,
      }}
    >
      <TaskItem
        isDone={data.done}
        isEditing={isEditing}
        subject={data.subject}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
        simultaneousHandlers={simultaneousHandlers}
        onToggleCheckbox={handleToggleCheckbox}
      />
    </StyledView>
  );
};

function TaskList({
  data,
  editingItemId,
  onChangeSubject,
  onFinishEditing,
  onPressLabel,
  onRemoveItem,
  onToggleItem,
}: TaskListProps) {
  const refScrollView = useRef(null);

  return (
    <StyledScrollView ref={refScrollView} w={'full'}>
      <AnimatePresence>
        {data.map((item) => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            isEditing={item.id === editingItemId}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
            onToggleItem={onToggleItem}
            simultaneousHandlers={refScrollView}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  );
}

export default TaskList;
