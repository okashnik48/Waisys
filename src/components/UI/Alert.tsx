import React from "react";
import { Alert, Space } from "antd";

interface AlertProps {
  alertType: "success" | "info" | "warning" | "error" | undefined;
  alertMessage: string;
  alertDescription: string;
}

const App: React.FC<AlertProps> = ({
  alertType,
  alertMessage,
  alertDescription,
}) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Alert
        message={alertMessage}
        description={alertDescription}
        type={alertType}
        closable
      />
    </Space>
  );
};

export default App;
