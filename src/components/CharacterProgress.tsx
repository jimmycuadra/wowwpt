import React from "react";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import QuestProgress from "./QuestProgress";
import RaidProgress from "./RaidProgress";
import MythicPlusProgress from "./MythicPlusProgress";
import VaultRewards from "./VaultRewards";
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
    <Container fluid>
      <Row>
        <Col>
          <h3 className="mb-sm-5">Weekly progress for {character.name}-{character.realm} ({regions[character.region].long})</h3>
        </Col>
      </Row>
      <Row className="mb-sm-5">
        <Col>
          <VaultRewards />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <QuestProgress progress={progress} />
        </Col>
        <Col sm={3}>
          <RaidProgress progress={progress} />
        </Col>
        <Col sm={3}>
          <MythicPlusProgress progress={progress} />
        </Col>
      </Row>
    </Container>
  );
}
