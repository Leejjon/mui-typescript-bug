import { Autocomplete, Box, TextField } from '@mui/material';
import './App.css';
import { ChangeEvent, useState } from 'react';

export interface Match {
  id: string
  startTimestamp: string,
  competitionName: string,
  homeTeamName: string,
  homeTeamID: string,
  awayTeamName: string,
  awayTeamID: string,
  finished: boolean,
  score: Score
}

export interface Score {
  home: number,
  away: number
}

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedMatchId, setSelectedMatchId] = useState<string>();
  const [matches] = useState([
    {score:{away:0,home:0},competitionId:"2001",competitionName:"Champions League",awayTeamName:"Sturm Graz",finished:false,homeTeamName:"Atalanta",homeTeamID:"102",awayTeamID:"2021",startTimestamp:"2025-01-21T17:45:00.000Z",id:"football-data-523975"},
    {score:{away:0,home:0},competitionId:"2001",competitionName:"Champions League",awayTeamName:"Aston Villa",finished:false,homeTeamName:"AS Monaco FC",homeTeamID:"548",awayTeamID:"58",startTimestamp:"2025-01-21T17:45:00.000Z",id:"football-data-524043"},
]);
  // The fuck is wrong with this: https://github.com/mui/material-ui/issues/29943

  const getHomeTeamNameToDisplay = (match: Match) => {
    if (match.competitionName === 'European Cup' && window.location.hostname.endsWith('blindepool.nl')) {
        return parseInt(match.homeTeamID);
    } else {
        return match.homeTeamName;
    }
  }

  const getAwayTeamNameToDisplay = (match: Match) => {
    if (match.competitionName === 'European Cup' && window.location.hostname.endsWith('blindepool.nl')) {
        return parseInt(match.awayTeamID);
    } else {
        return match.awayTeamName;
    }
  }

  const displayMatchInDropdown = (upcomingMatch: Match | string): string => {
    const homeTeamName = getHomeTeamNameToDisplay(upcomingMatch as Match);
    const awayTeamName = getAwayTeamNameToDisplay(upcomingMatch as Match);
    return `${homeTeamName} vs ${awayTeamName}`;
  };

  const updateSelectMatch = (_event: ChangeEvent<object> | null, selectedMatch: null | string | Match) => {
    const supportedMatch = selectedMatch as Match;
    if (supportedMatch && supportedMatch.id) {
      setSelectedMatchId(supportedMatch.id);
    }
  };

  return (
    <>
      <Autocomplete
      disabled={matches.length < 1}
      freeSolo
      onChange={updateSelectMatch}
      inputValue={inputValue}
      onInputChange={(_event: ChangeEvent<{}>, newSupportedMatch: string) => {
          setInputValue(newSupportedMatch)
      }}
      getOptionLabel={displayMatchInDropdown}
      options={matches as Match[]}
      sx={{ width: 300 }}
      renderOption={(props: any, option: Match) => {
        return (<li {...props} key={option.id}>{option.id}<br/></li>);
      }}
      renderInput={(params) => <TextField {...params} label="Match" />}
      />
      <p>Selected match: {selectedMatchId}</p>
    </>
  )
}

export default App;
