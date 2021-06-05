import {useEffect, useCallback, useState} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCar} from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';

import {Text} from '../text/text';
import {TextInput} from '../input/input';

const StyledPanel = styled.div`
  background: #ffffff;
  color: #6daffe;
  border-radius: 2rem;
  box-shadow: rgba(109, 175, 254, 0.1) 0px 2px 8px 0px;
  display: grid;
  grid-row-gap: 1rem;
  height: auto;
  justify-items: center;
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  position: relative;
  z-index: 5;
`;

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  position: relative;
  z-index: 15;
`;

const IconWrapper = styled.div`
  align-content: center;
  background: #6daffe;
  border-radius: 50% !important;
  border: 0.5rem solid #edf6ff;
  color: #ffffff;
  display: grid;
  height: 6rem;
  justify-content: center;
  margin: -3rem 0 0 0;
  width: 6rem;

  > svg {
    display: block;
    height: 6rem;
    width: 6rem;
    font-size: 3rem;
  }
`;

const BackGroundLetter = styled.div`
  position: absolute;
  right: 0rem;
  bottom: -2rem;
  font-size: 15rem;
  font-weight: bold;
  color: rgba(150, 197, 254, 0.2);
  z-index: 10;
`;

const Panel = (props) => {
  const {fuelconsumption, letter, id} = props;
  const fuelConsumptionLitersPerKm = fuelconsumption / 100; // X litraa / 100km --> Y Litra / 1km
  const fuelConsumptionMultiplier = 1.009;

  // Inputs
  const [speed1, setSpeed1] = useState(0);
  const [speed2, setSpeed2] = useState(0);
  const [distance, setDistance] = useState(0);

  // Outputs
  const [fuel1, setFuel1] = useState(0);
  const [fuelDifference, setFuelDifference] = useState(0);
  const [fuel2, setFuel2] = useState(0);
  const [time1, setTime1] = useState(0);
  const [timeDifference, setTimeDifference] = useState(0);
  const [time2, setTime2] = useState(0);

  const calculateFuelConsumption = useCallback(
    (speed, distance) => {
      if (distance > 0 && speed > 0) {
        let increment = fuelConsumptionLitersPerKm * Math.pow(fuelConsumptionMultiplier, speed - 1);
        return parseFloat((distance * increment).toFixed(2));
      }

      return null;
    },
    [fuelConsumptionLitersPerKm, fuelConsumptionMultiplier]
  );

  const calculateTime = useCallback((speed, distance) => {
    if (distance > 0 && speed > 0) {
      return parseFloat((distance / speed).toFixed(2));
    }

    return null;
  }, []);

  const calculateDifference = useCallback((value1, value2) => {
    if (value1 && value2) {
      return Math.abs(value1 - value2).toFixed(2);
    }

    return null;
  }, []);

  const isBetter = (value1, value2, direction) => {
    if (value1 === 0 && value2 === 0) {
      return null;
    }

    console.log('herererre');

    if (direction === 'greater') {
      return value1 > value2;
    } else if (direction === 'smaller') {
      return value1 < value2;
    }
  };

  useEffect(() => {
    setFuel1(calculateFuelConsumption(speed1, distance));
    setFuel2(calculateFuelConsumption(speed2, distance));
    setFuelDifference(calculateDifference(fuel1, fuel2));
    setTime1(calculateTime(speed1, distance));
    setTime2(calculateTime(speed2, distance));
    setTimeDifference(calculateDifference(time1, time2));
  }, [
    speed1,
    speed2,
    distance,
    fuel1,
    fuel2,
    time1,
    time2,
    calculateFuelConsumption,
    calculateTime,
    calculateDifference
  ]);

  return (
    <motion.div
      initial={{scale: 0}}
      animate={{scale: 1}}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }}
    >
      <StyledPanel>
        <BackGroundLetter>{letter}</BackGroundLetter>

        <IconWrapper>
          <FontAwesomeIcon icon={faCar}></FontAwesomeIcon>
        </IconWrapper>
        <StyledTable>
          <tbody>
            <tr>
              <td colSpan="2">
                <TextInput
                  name={`${id}-matka`}
                  id={`${id}-matka$`}
                  placeholder="Matka"
                  icon="distance"
                  description="km"
                  value={distance}
                  setValue={setDistance}
                  gridSpan={2}
                ></TextInput>
              </td>
            </tr>
            <tr>
              <td>
                <TextInput
                  name={`${id}-nopeus1`}
                  id={`${id}-nopeus1`}
                  placeholder="Nopeus"
                  icon="speed"
                  description="km/h"
                  setValue={setSpeed1}
                  value={speed1}
                ></TextInput>
              </td>
              <td>
                <TextInput
                  name={`${id}-nopeus2`}
                  id={`${id}-nopeus2`}
                  placeholder="Nopeus"
                  icon="speed"
                  description="km/h"
                  setValue={setSpeed2}
                  value={speed2}
                ></TextInput>
              </td>
            </tr>
          </tbody>
        </StyledTable>

        <StyledTable>
          <tbody>
            <tr>
              <th colSpan="3">
                <h2 className="title">
                  Aika <code>(H)</code>
                </h2>
              </th>
            </tr>
            <tr>
              <td>
                <Text value={time1} isBetter={isBetter(time1, time2, 'smaller')}></Text>
              </td>
              <td>
                <Text
                  value={timeDifference ? `- ${timeDifference}` : null}
                  isBetter={true}
                  isComparison={true}
                ></Text>
              </td>
              <td>
                <Text value={time2} isBetter={isBetter(time2, time1, 'smaller')}></Text>
              </td>
            </tr>
            <tr>
              <th colSpan="3">
                <h2 className="title">
                  Bensankulutus <code>(L)</code>
                </h2>
              </th>
            </tr>
            <tr>
              <td>
                <Text value={fuel1} isBetter={isBetter(fuel1, fuel2, 'smaller')}></Text>
              </td>
              <td>
                <Text
                  value={fuelDifference ? `- ${fuelDifference}` : null}
                  isBetter={true}
                  isComparison={true}
                ></Text>
              </td>
              <td>
                <Text value={fuel2} isBetter={isBetter(fuel2, fuel1, 'smaller')}></Text>
              </td>
            </tr>
          </tbody>
        </StyledTable>
      </StyledPanel>
    </motion.div>
  );
};

export {Panel};
