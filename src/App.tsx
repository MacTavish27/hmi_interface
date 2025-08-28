import { useEffect, useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Indicator from "./components/Indicator";
import Property from "./components/Property";
import PumpStatus from "./components/PumpStatus";
import {
  getFireData,
  getModel,
  getSim,
  postModel,
  postStart,
} from "./services/api-client";
import type {
  FireStatus,
  FullModelResponse,
  ProcessData,
} from "./services/api-client";
import ProcessButton from "./components/ProcessButton";
import { Text } from "@chakra-ui/react";

function App() {
  const [data, setData] = useState<FullModelResponse | null>(null);
  const [sim_data, setSimData] = useState<ProcessData | null>(null);
  const [fire_data, setFireData] = useState<FireStatus | undefined>(undefined);

  const [isStarted, setStarted] = useState(false);
  const [isLeaked, setLeaked] = useState(false);

  const handleClick = () => {
    setStarted(!isStarted);
    const message = isStarted ? "stop" : "start";
    postStart(message);
  };

  const Leak_trigger = () => {
    setLeaked(!isLeaked);
    postStart("/scenario/leak");
  };

  useEffect(() => {
    const fetchAll = () => {
      getModel()
        .then(setData)
        .catch((err) => console.error("Model fetch failed", err));

      if (isStarted) {
        getSim("/sim")
          .then(setSimData)
          .catch((err) => console.error("Sim fetch failed", err));
      }

      if (isLeaked) {
        getFireData("/scenario/fire_status'")
          .then(setFireData)
          .catch((err) => console.error("Fire fetch failed", err));
      }
    };

    fetchAll();
    const intervalId = setInterval(fetchAll, 1000);
    return () => clearInterval(intervalId);
  }, [isStarted, isLeaked]);

  const getValvePVValue = (id: string) =>
    data && id in data
      ? ((data[id] as any).pv * 100).toFixed(0).toString()
      : undefined;

  const getValveOPValue = (id: string) =>
    data && id in data
      ? ((data[id] as any).op * 100).toFixed(0).toString()
      : undefined;

  const getIndicatorValue = () =>
    data && "vessel1" in data
      ? (data["vessel1"] as any).v_liquid / (data["vessel1"] as any).v_total
      : 0;

  const getPressureValue = () =>
    data && "vessel1" in data ? (data["vessel1"] as any).p_total : 0;

  const getPumpStatus = (id: string) =>
    data && id in data ? (data[id] as any).op > 0 : false;

  const setOp = (tag: string, value: number) => {
    postModel(tag, "set_op", value);
  };

  const valveConfigs = [
    { id: "V4", top: "40%", left: "13%" },
    { id: "V0", top: "63%", left: "29%" },
    { id: "V1", top: "41%", left: "41%" },
    { id: "V2", top: "88%", left: "41%" },
    { id: "V5", top: "40%", left: "59%" },
    { id: "V6", top: "87%", left: "59%" },
    { id: "V3", top: "40%", left: "72%" },
  ];
  return (
    <Background>
      {valveConfigs.map(({ id, top, left }) => (
        <Property
          key={id}
          id={id}
          top={top}
          left={left}
          pv_value={getValvePVValue(id.toLowerCase())}
          op_value={getValveOPValue(id.toLowerCase())}
          onSubmit={(value) => setOp(id.toLowerCase(), value)}
        />
      ))}

      <Indicator
        value={getIndicatorValue() * 100}
        pressure={getPressureValue().toFixed(2)}
      />
      <PumpStatus status={getPumpStatus("p1")} top="59%" left="53.6%" id="p1" />
      <PumpStatus
        status={getPumpStatus("p2")}
        top="83.6%"
        left="53.6%"
        id="p2"
      />
      <ProcessButton
        top="15%"
        left="80%"
        status={isStarted}
        content={isStarted ? "Stop" : "Start"}
        onClick={handleClick}
      />

      <ProcessButton
        top="90%"
        left="4%"
        status={isLeaked}
        content={isLeaked ? "Stop" : "Leak"}
        onClick={Leak_trigger}
      />
      <Text
        color={fire_data?.fire ? "red" : "green"}
        position="absolute"
        top="92%"
        left="13%"
      >
        Fire status: {fire_data?.fire ? "Firing!" : "OK"}
      </Text>
      <Text fontSize="14px" position="absolute" top="30%" left="8%">
        {sim_data?.Source}
      </Text>
      <Text fontSize="14px" position="absolute" top="65%" left="58%">
        {Number(sim_data?.Mid1_out).toFixed(2)}
      </Text>
      <Text fontSize="14px" position="absolute" top="75%" left="58%">
        {Number(sim_data?.Mid2_out).toFixed(2)}
      </Text>
      <Text fontSize="14px" position="absolute" top="50%" left="88%">
        {sim_data?.Outlet}
      </Text>
    </Background>
  );
}

export default App;
