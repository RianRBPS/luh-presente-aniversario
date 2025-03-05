import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import "./App.css";

// Dados da árvore de decisão
const decisionTree = {
  start: {
    question: "É para gasto fixo?",
    yes: "planejamento",
    no: "compromete_gasto_fixo",
  },
  planejamento: {
    question: "Estava no meu planejamento financeiro?",
    yes: "entao_gaste",
    no: "planejar_para_mes_que_vem",
  },
  planejar_para_mes_que_vem: {
    question: "Dá para planejar para o mês que vem com mais calma?",
    yes: "nao_vale_a_pena",
    no: "entao_gaste",
  },
  compromete_gasto_fixo: {
    question: "Pode comprometer algum gasto fixo desse mês?",
    yes: "nao_vale_a_pena",
    no: "impacta_saude_mental",
  },
  impacta_saude_mental: {
    question: "Vai impactar minha saúde mental de alguma forma?",
    yes: "entao_gaste",
    no: "foi_ideia_de_outro",
  },
  foi_ideia_de_outro: {
    question: "Foi ideia de outro alguém?",
    yes: "gastou_recentemente_com_pessoa",
    no: "quer_gastar_no_fundo",
  },
  gastou_recentemente_com_pessoa: {
    question: "Eu gastei com essa pessoa recentemente?",
    yes: "nao_vale_a_pena",
    no: "quer_gastar_no_fundo",
  },
  quer_gastar_no_fundo: {
    question: "Lá no fundo, eu quero gastar com isso?",
    yes: "entao_gaste",
    no: "nao_vale_a_pena",
  },
  entao_gaste: {
    result: "Então gaste! 🌻",
  },
  nao_vale_a_pena: {
    result: "Então não vale a pena 🚫",
  },
};

// Configurações de animação
const SWIPE_THRESHOLD = 100;

// Componente de cartão deslizante
const DecisionCard = ({ step, onSwipe }) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const [leaveDirection, setLeaveDirection] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("no"),
    onSwipedRight: () => handleSwipe("yes"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    setLeaveDirection(direction);
    setIsLeaving(true);

    setTimeout(() => {
      onSwipe(direction);
      setIsLeaving(false);
      setLeaveDirection(null);
    }, 300);
  };

  return (
    <motion.div
      className="card"
      {...handlers}
      initial={{ x: 0, opacity: 1 }}
      animate={
        isLeaving
          ? { x: leaveDirection === "yes" ? 500 : -500, opacity: 0 }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: 0.3 }}
    >
      <div className="sunflower">🌻</div>
      <div className="question">
        <h2>{decisionTree[step].question || decisionTree[step].result}</h2>
      </div>
      <div className="sunflower bottom">🌻</div>
    </motion.div>
  );
};

const App = () => {
  const [currentStep, setCurrentStep] = useState("start");

  const handleSwipe = (answer) => {
    const nextStep = decisionTree[currentStep][answer];
    setTimeout(() => {
      if (nextStep) {
        setCurrentStep(nextStep);
      } else {
        setCurrentStep("start");
      }
    }, 300);
  };

  return (
    <div className="container">
      <DecisionCard step={currentStep} onSwipe={handleSwipe} />
    </div>
  );
};

export default App;
