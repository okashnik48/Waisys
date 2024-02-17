import React from "react";
import { Alert, Space } from "antd";

interface AlertProps {
  alertType: "success" | "info" | "warning" | "error" | undefined;
  alertMessage: string;
  alertDescription: string;
}

type ArrayAlertProps = Record<string, AlertProps>;

const App: React.FC<ArrayAlertProps> = (AlertArray) => {
  
  return (
    <div  style={{ position: 'absolute', top: 0, right: 0 }}>
      {Object.entries(AlertArray).map(([key, alert]) => (
        <Alert
          key={key}
          message={alert.alertMessage}
          description={alert.alertDescription}
          type={alert.alertType}
          style={{ marginBottom: '10px' }}
          closable
        />
      ))}
    </div>
  );
};

export default App;
