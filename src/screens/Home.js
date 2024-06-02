import React, {useState} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {Appbar, TextInput, Button, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {useMyContextController, logout} from '../context';
import COLORS from '../../constants';
import Jobs from '../context/Jobs';

const Home = () => {
  const [job, setJob] = useState('');
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  const [visible, setVisible] = useState(false);
  const ref = firestore().collection('jobs');

  const navigation = useNavigation();

  async function addJob() {
    await ref.add({
      title: job,
    });
    setJob('');
  }

  useState(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title} = doc.data();
        list.push({
          id: doc.id,
          title,
        });
      });
      setJobs(list);

      if (loading) {
        setLoading(false);
      }
    });
  });

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
      <Appbar.Header>
        <Appbar.Content
          title={`Xin chào : ${userLogin ? userLogin.fullName : 'Guest'}`}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="cog" onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              logout(dispatch, navigation);
              closeMenu();
            }}
            title="Logout"
          />
        </Menu>
      </Appbar.Header>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholder="Thêm công việc mới "
          value={job}
          onChangeText={text => setJob(text)}
          style={{flex: 1}}
        />
        <Button
          onPress={addJob}
          style={{
            borderRadius: 5,
            height: 50,
            justifyContent: 'center',
            backgroundColor: ' grey ',
          }}>
          Add
        </Button>
      </View>
      <FlatList
        style={{flex: 1}}
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Jobs {...item} />}
      />
    </SafeAreaView>
  );
};

export default Home;
