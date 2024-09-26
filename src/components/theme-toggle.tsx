import { HStack, Switch, Text, useColorMode } from 'native-base';
import React from 'react';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack space={2} alignItems={'center'}>
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
      ></Switch>
      <Text>Dark</Text>
    </HStack>
  );
}

export default ThemeToggle;
