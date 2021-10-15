import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Stack, Grid, Box, Heading, Checkbox, CheckboxGroup } from '@chakra-ui/react';

import Legend from './Legend';
import useDebounce from '../../utils/useDebounce';

const fetcher = url => axios.get(url).then(({ data }) => data);

const Thematic = ({ year, activeThematic, thematicHandler }) => {
  const debouncedYear = useDebounce(year, 500);
  const { data } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/thematic?year=${debouncedYear}` : null,
    fetcher
  );

  return (
    <>
      {data && data.length ? (
        <Box mb={5}>
          <Heading size="md" mb={2}>
            Thematic
          </Heading>
          <Stack
            px="15px"
            pt="1px"
            pb={8}
            backgroundColor="white"
            borderRadius="5px"
            boxShadow="md"
          >
            <CheckboxGroup>
              {data.map(layer => (
                <Grid key={layer.id} templateColumns="25px 1fr">
                  <Checkbox
                    isChecked={activeThematic && activeThematic.id === layer.id}
                    onChange={e => thematicHandler(e.target.checked ? layer : null)}
                  />
                  <Legend {...layer} />
                </Grid>
              ))}
            </CheckboxGroup>
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

Thematic.propTypes = {
  year: PropTypes.number.isRequired,
  activeThematic: PropTypes.shape(),
  thematicHandler: PropTypes.func.isRequired,
};

Thematic.defaultProps = {
  activeThematic: null,
};

export default Thematic;
