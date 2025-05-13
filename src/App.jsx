import { useEffect } from 'react';
import { WebApp } from '@twa-dev/sdk';
import { MantineProvider, Container, Text, Button, Stack } from '@mantine/core';

function App() {
  useEffect(() => {
    // Initialize the Web App
    WebApp.ready();
    
    // Enable closing confirmation
    WebApp.enableClosingConfirmation();
  }, []);

  const handleMainButtonClick = () => {
    // Send data back to the bot
    WebApp.sendData(JSON.stringify({
      action: 'button_clicked',
      timestamp: new Date().toISOString()
    }));
  };

  const handleBackToBot = () => {
    // Close the Mini App and return to the bot
    WebApp.close();
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container size="sm" py="xl">
        <Stack spacing="lg">
          <Text size="xl" weight={700}>
            Welcome to Telegram Mini App
          </Text>
          
          <Text>
            User ID: {WebApp.initDataUnsafe?.user?.id}
          </Text>

          <Button
            color="blue"
            onClick={handleMainButtonClick}
          >
            Send Data to Bot
          </Button>

          <Button
            color="gray"
            onClick={handleBackToBot}
          >
            Return to Bot
          </Button>
        </Stack>
      </Container>
    </MantineProvider>
  );
}

export default App; 