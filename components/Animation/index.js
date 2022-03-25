import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Stack, Grid, Box, Heading, Checkbox, CheckboxGroup } from '@chakra-ui/react';

import Playback from './Playback';
import useDebounce from '../../utils/useDebounce';

const fetcher = url => axios.get(url).then(({ data }) => data);

const Animation = ({
  year,
  activeAnimation,
  animationHandler,
  animationFrame,
  animationFrameHandler,
}) => {
  const debouncedYear = useDebounce(year, 500);
  const { data } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/animations?year=${debouncedYear}` : null,
    fetcher
  );

  return (
    <>
      {data && data.length ? (
        <Box mb={5}>
          <Heading size="md" mb={2}>
            Animations
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
                    isChecked={activeAnimation && activeAnimation.name === layer.name}
                    onChange={e => animationHandler(e.target.checked ? layer : null)}
                    mt={-2}
                  />
                  <Playback
                    {...layer}
                    isActive={activeAnimation && activeAnimation.name === layer.name}
                    animationFrame={animationFrame}
                    animationFrameHandler={animationFrameHandler}
                  />
                </Grid>
              ))}
            </CheckboxGroup>
          </Stack>
        </Box>
      ) : null}
    </>
  );
};

Animation.propTypes = {
  year: PropTypes.number.isRequired,
  activeAnimation: PropTypes.shape(),
  animationHandler: PropTypes.func.isRequired,
  animationFrame: PropTypes.number,
  animationFrameHandler: PropTypes.func.isRequired,
};

Animation.defaultProps = {
  activeAnimation: null,
  animationFrame: null,
};

export default Animation;
