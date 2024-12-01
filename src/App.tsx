import { Autocomplete, Box, TextField } from '@mui/material';
import './App.css';
import { SyntheticEvent, useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedMatch, setSelectedMatch] = useState<string | undefined>(undefined);
  const [matches] = useState(["AZ - Ajax", "PSV - Feyenoord"]);
  // The fuck is wrong with this: https://github.com/mui/material-ui/issues/29943
  return (
    <>
      <Autocomplete
      disablePortal
      freeSolo
      inputValue={inputValue}
      onInputChange={(_event: SyntheticEvent, value: string) => {
          setInputValue(value)
      }}
      onChange={(_event: SyntheticEvent, value: string | null) => {
        if (value) {
          setSelectedMatch(value);
        }
      }}
      options={matches}
      sx={{ width: 300 }}
      renderOption={(props: any, option: string) => {
        return (<Box {...props} key={option}>{option}<br/></Box>);
      }}
      renderInput={(params) => <TextField {...params} label="Match" />}
      />
      <p>Selected match: {selectedMatch}</p>
    </>
  )
}

export default App;
