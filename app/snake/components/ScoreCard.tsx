"use client";
import { useSelector } from "react-redux";
import { IGlobalState } from "../../../store/store";
import React from "react";

const ScoreCard = () => {
    const score = useSelector((state: IGlobalState) => state.snakeReducer.score);
    return (
        <h2>Current Score: {score}</h2>
    );
}

export default ScoreCard;
