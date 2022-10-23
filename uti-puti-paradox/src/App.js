import React, { useState, useEffect, useCallback } from "react";
import { Card, Button, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

function App() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [answersVisible, setAnswersVisible] = useState(false);
  const [actionText, setActionText] = useState("");
  const [hintCardNumber, setHintCardNumber] = useState(0);
  const [cards, setCards] = useState([0, 0, 0, 0]);
  const [winsNumber, setWinsNumber] = useState(0);
  const [roundsNumber, setRoundsNumber] = useState(0);

  const generageCards = () => {
    const randomNumber = Math.ceil(Math.random() * 3);
    const newCards = [0, 0, 0, 0];
    newCards[randomNumber] = 1;
    setCards(newCards);
  };

  const onCardClick = (cardNumber) => {
    if (answersVisible || cardNumber === hintCardNumber) {
      return;
    }

    setSelectedCard(cardNumber);
    for (let i = 1; i <= 3; i++) {
      if (i !== cardNumber && !cards[i]) {
        setHintCardNumber(i);
      }
    }
    setActionText("You can change your choice");
  };

  const showAnswer = () => {
    setAnswersVisible(true);
    if (cards[selectedCard]) {
      setWinsNumber(winsNumber + 1);
      setActionText("You won!");
    } else {
      setActionText("You lost, try again :(");
    }
    setRoundsNumber(roundsNumber + 1);
    setTimeout(() => {
      resetRound();
    }, 3000);
  };

  const resetRound = useCallback(() => {
    setSelectedCard(0);
    setAnswersVisible(false);
    setActionText(false);
    setHintCardNumber(0);
    generageCards();
    setActionText("Choose a card");
  }, []);

  const startNewExperiment = () => {
    resetRound();
    setWinsNumber(0);
    setRoundsNumber(0);
  };

  useEffect(() => {
    resetRound();

    Modal.info({
      title: "Uti Puti Paradox",
      content: (
        <div>
          <p>
            Suppose you're on a game show, and you're given the choice of three
            doors: Behind one door is a Fine Apple; behind the others - Nofing.
          </p>
          <p>
            You pick a door, say No. 1, and Uti-Puti, who knows what's behind
            the doors, opens another door, say No. 3, which has a Nofing. He
            then says to you, "Do you want to pick door No. 2?"
          </p>
          <p>
            <b>Is it to your advantage to switch your choice?</b>
          </p>
        </div>
      ),
      okText: "Start experiment",
    });
  }, [resetRound]);

  return (
    <div className="main-container">
      <div className="app-header">
        <h4 className="app-title">Uti-Puti Paradox</h4>
        <Button type="primary" onClick={startNewExperiment}>
          Start new Experiment
        </Button>
      </div>
      <div className="cards-row">
        {[1, 2, 3].map((cardNumber) => {
          const cardAnswerVisible =
            hintCardNumber === cardNumber || answersVisible;
          const winIcon = (
            <img
              className="img-icon"
              src="https://cdn-icons-png.flaticon.com/512/898/898142.png"
            />
          );
          const lostIcon = (
            <img
              className="img-icon"
              src="https://cdn-icons-png.flaticon.com/512/5108/5108602.png"
            />
          );
          const icon = cards[cardNumber] === 1 ? winIcon : lostIcon;
          return (
            <Card
              key={cardNumber}
              className="card"
              onClick={() => onCardClick(cardNumber)}
            >
              <div>
                {selectedCard === cardNumber ? <CheckCircleOutlined /> : "-"}
              </div>
              <div>{cardNumber}</div>
              <div>{cardAnswerVisible ? icon : "-"}</div>
            </Card>
          );
        })}
      </div>
      <div className="actions-bar">
        <h4>{actionText}</h4>
        <Button
          type="primary"
          disabled={selectedCard < 1 || answersVisible}
          onClick={showAnswer}
        >
          Show answer
        </Button>
      </div>
      <table className="results-table">
        <thead>
          <tr>
            <th>Wins</th>
            <th>Rounds</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{winsNumber}</td>
            <td>{roundsNumber}</td>
            <td>
              {roundsNumber > 0
                ? Math.round((100 * winsNumber) / roundsNumber)
                : "0"}{" "}
              %
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
