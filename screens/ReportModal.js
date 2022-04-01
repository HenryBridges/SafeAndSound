import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Buttons/Button';
import RoundButton from '../components/Buttons/roundButtons';
import gc from '../general/globalColors';
import OurModal from '../components/Other/OurModal';
import OurTextInput from '../components/Other/TextInput';
import DropDownPicker from 'react-native-dropdown-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ReportModal = (props) => {
  const { visible, topSpace } = props;
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [incidentValue, setIncidentValue] = useState('');
  const incidentItems = [
    { label: 'Spiking', value: 'spiking' },
    { label: 'Assault', value: 'assault' },
    { label: 'Other', value: 'other' }
  ];

  const [venueOpen, setVenueOpen] = useState(false);
  const [venueValue, setVenueValue] = useState('');
  const venues = [
    //fetch venues from DB here.
    { label: 'Baa Bar', value: 'baabar' },
    { label: 'Elektrik', value: 'elektrik' },
    { label: 'Baa Bar', value: 'baabar' },
    { label: 'Elektrik', value: 'elektrik' },
    { label: 'Other', value: 'other' }
  ];

  // Going to want to fetch the users info to autofill some of the fields
  // i.e. Name, D.O.B, etc.

  // Also want to fetch venue and populate the dropdown picker with these.
  return (
    <>
      <OurModal visible={visible} topSpace={topSpace}>
        <View style={styles.formContainer}>
          <View style={{ padding: 10, zIndex: 1000 }}>
            <DropDownPicker
              placeholder='Type of Incident'
              open={incidentOpen}
              value={incidentValue}
              items={incidentItems}
              setOpen={setIncidentOpen}
              setValue={setIncidentValue}
              dropDownDirection='BOTTOM'
              zIndex={1000}
              style={{
                backgroundColor: '#f6f6f6',
                borderColor: gc.colors.darkGrey,
                height: 0.05 * height,
                width: 0.65 * width
              }}
              containerStyle={{
                backgroundColor: '#f6f6f6',
                width: 0.65 * width
              }}
              onSelectItem={(item) => console.log(item.value)}
            />
          </View>
          <View style={{ padding: 10 }}>
            <DropDownPicker
              placeholder='Venue'
              open={venueOpen}
              value={venueValue}
              items={venues}
              setOpen={setVenueOpen}
              setValue={setVenueValue}
              dropDownDirection='BOTTOM'
              zIndex={800}
              style={{
                backgroundColor: '#f6f6f6',
                borderColor: gc.colors.darkGrey,
                height: 0.05 * height,
                width: 0.65 * width
              }}
              containerStyle={{
                backgroundColor: '#f6f6f6',
                width: 0.65 * width
              }}
              onSelectItem={(item) => console.log(item.value)}
            />
          </View>
        </View>
      </OurModal>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});
export default ReportModal;
