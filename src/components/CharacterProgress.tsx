import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import "./CharacterProgress.css";
import QuestProgress from "./QuestProgress";
import RaidProgress from "./RaidProgress";
import MythicPlusProgress from "./MythicPlusProgress";
import {
  selectCurrentCharacter,
  selectProgress,
} from "../redux/characters";
import { regions } from "../model/region";

export default function CharacterProgress() {
  const character = useSelector(selectCurrentCharacter);
  const progress = useSelector(selectProgress);

  if (!(character && progress)) {
    return <></>;
  }

  return (
    <Container fluid className="character-progress px-sm-5">
      <Row>
        <Col>
          <h3>Weekly progress for {character.name}-{character.realm} ({regions[character.region].long})</h3>
        </Col>
      </Row>
      <Row className="mx-sm-n5">
        <Col sm="auto" className="px-sm-5">
          <QuestProgress progress={progress} />
        </Col>
        <Col className="px-sm-5">
          <RaidProgress progress={progress} />
        </Col>
        <Col className="px-sm-5">
          <MythicPlusProgress progress={progress} />
        </Col>
      </Row>
    </Container>
  );
}
