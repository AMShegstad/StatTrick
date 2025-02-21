import React, { useEffect } from 'react';
import { Team } from '../models/teamModel';
import { teams } from '../classes/cities';

const fetchSkaterData = async (skater: Skater, onDataFetched: (data: Skater) => void) => {
    try {
        const response = await fetch('');
        const data = await response.json();
        const skaterDataFromApi = data.standings.find(
            (record: { teamAbbrev: { default: string }; wins: number; losses: number; otLosses: number; points: number; gamesPlayed: number }) =>
                record.teamAbbrev?.default === skater.triCode
        );
    }
