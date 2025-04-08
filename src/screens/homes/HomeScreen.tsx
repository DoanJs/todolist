import {
  Add,
  Edit2,
  Element4,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {auth} from '../../../firebaseConfig';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import CardImageComponent from '../../components/CardImageComponent';
import CicularComponent from '../../components/CicularComponent';
import Container from '../../components/Container';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceConponent from '../../components/SpaceConponent';
import TagComponent from '../../components/TagComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../contants/colors';
import {globalStyles} from '../../styles/globalStyles';

// import {collection, addDoc} from 'firebase/firestore';

const HomeScreen = ({navigation}: any) => {
  const user = auth.currentUser;

  // const users = [
  //   // {
  //   //   id: 1,
  //   //   name: 'Leanne Graham',
  //   //   username: 'Bret',
  //   //   email: 'Sincere@april.biz',
  //   //   address: {
  //   //     street: 'Kulas Light',
  //   //     suite: 'Apt. 556',
  //   //     city: 'Gwenborough',
  //   //     zipcode: '92998-3874',
  //   //     geo: {
  //   //       lat: '-37.3159',
  //   //       lng: '81.1496',
  //   //     },
  //   //   },
  //   //   phone: '1-770-736-8031 x56442',
  //   //   website: 'hildegard.org',
  //   //   company: {
  //   //     name: 'Romaguera-Crona',
  //   //     catchPhrase: 'Multi-layered client-server neural-net',
  //   //     bs: 'harness real-time e-markets',
  //   //   },
  //   // },
  //   {
  //     id: 2,
  //     name: 'Ervin Howell',
  //     username: 'Antonette',
  //     email: 'Shanna@melissa.tv',
  //     address: {
  //       street: 'Victor Plains',
  //       suite: 'Suite 879',
  //       city: 'Wisokyburgh',
  //       zipcode: '90566-7771',
  //       geo: {
  //         lat: '-43.9509',
  //         lng: '-34.4618',
  //       },
  //     },
  //     phone: '010-692-6593 x09125',
  //     website: 'anastasia.net',
  //     company: {
  //       name: 'Deckow-Crist',
  //       catchPhrase: 'Proactive didactic contingency',
  //       bs: 'synergize scalable supply-chains',
  //     },
  //   },
  //   {
  //     id: 3,
  //     name: 'Clementine Bauch',
  //     username: 'Samantha',
  //     email: 'Nathan@yesenia.net',
  //     address: {
  //       street: 'Douglas Extension',
  //       suite: 'Suite 847',
  //       city: 'McKenziehaven',
  //       zipcode: '59590-4157',
  //       geo: {
  //         lat: '-68.6102',
  //         lng: '-47.0653',
  //       },
  //     },
  //     phone: '1-463-123-4447',
  //     website: 'ramiro.info',
  //     company: {
  //       name: 'Romaguera-Jacobson',
  //       catchPhrase: 'Face to face bifurcated interface',
  //       bs: 'e-enable strategic applications',
  //     },
  //   },
  //   {
  //     id: 4,
  //     name: 'Patricia Lebsack',
  //     username: 'Karianne',
  //     email: 'Julianne.OConner@kory.org',
  //     address: {
  //       street: 'Hoeger Mall',
  //       suite: 'Apt. 692',
  //       city: 'South Elvis',
  //       zipcode: '53919-4257',
  //       geo: {
  //         lat: '29.4572',
  //         lng: '-164.2990',
  //       },
  //     },
  //     phone: '493-170-9623 x156',
  //     website: 'kale.biz',
  //     company: {
  //       name: 'Robel-Corkery',
  //       catchPhrase: 'Multi-tiered zero tolerance productivity',
  //       bs: 'transition cutting-edge web services',
  //     },
  //   },
  //   {
  //     id: 5,
  //     name: 'Chelsey Dietrich',
  //     username: 'Kamren',
  //     email: 'Lucio_Hettinger@annie.ca',
  //     address: {
  //       street: 'Skiles Walks',
  //       suite: 'Suite 351',
  //       city: 'Roscoeview',
  //       zipcode: '33263',
  //       geo: {
  //         lat: '-31.8129',
  //         lng: '62.5342',
  //       },
  //     },
  //     phone: '(254)954-1289',
  //     website: 'demarco.info',
  //     company: {
  //       name: 'Keebler LLC',
  //       catchPhrase: 'User-centric fault-tolerant solution',
  //       bs: 'revolutionize end-to-end systems',
  //     },
  //   },
  //   {
  //     id: 6,
  //     name: 'Mrs. Dennis Schulist',
  //     username: 'Leopoldo_Corkery',
  //     email: 'Karley_Dach@jasper.info',
  //     address: {
  //       street: 'Norberto Crossing',
  //       suite: 'Apt. 950',
  //       city: 'South Christy',
  //       zipcode: '23505-1337',
  //       geo: {
  //         lat: '-71.4197',
  //         lng: '71.7478',
  //       },
  //     },
  //     phone: '1-477-935-8478 x6430',
  //     website: 'ola.org',
  //     company: {
  //       name: 'Considine-Lockman',
  //       catchPhrase: 'Synchronised bottom-line interface',
  //       bs: 'e-enable innovative applications',
  //     },
  //   },
  //   {
  //     id: 7,
  //     name: 'Kurtis Weissnat',
  //     username: 'Elwyn.Skiles',
  //     email: 'Telly.Hoeger@billy.biz',
  //     address: {
  //       street: 'Rex Trail',
  //       suite: 'Suite 280',
  //       city: 'Howemouth',
  //       zipcode: '58804-1099',
  //       geo: {
  //         lat: '24.8918',
  //         lng: '21.8984',
  //       },
  //     },
  //     phone: '210.067.6132',
  //     website: 'elvis.io',
  //     company: {
  //       name: 'Johns Group',
  //       catchPhrase: 'Configurable multimedia task-force',
  //       bs: 'generate enterprise e-tailers',
  //     },
  //   },
  //   {
  //     id: 8,
  //     name: 'Nicholas Runolfsdottir V',
  //     username: 'Maxime_Nienow',
  //     email: 'Sherwood@rosamond.me',
  //     address: {
  //       street: 'Ellsworth Summit',
  //       suite: 'Suite 729',
  //       city: 'Aliyaview',
  //       zipcode: '45169',
  //       geo: {
  //         lat: '-14.3990',
  //         lng: '-120.7677',
  //       },
  //     },
  //     phone: '586.493.6943 x140',
  //     website: 'jacynthe.com',
  //     company: {
  //       name: 'Abernathy Group',
  //       catchPhrase: 'Implemented secondary concept',
  //       bs: 'e-enable extensible e-tailers',
  //     },
  //   },
  //   {
  //     id: 9,
  //     name: 'Glenna Reichert',
  //     username: 'Delphine',
  //     email: 'Chaim_McDermott@dana.io',
  //     address: {
  //       street: 'Dayna Park',
  //       suite: 'Suite 449',
  //       city: 'Bartholomebury',
  //       zipcode: '76495-3109',
  //       geo: {
  //         lat: '24.6463',
  //         lng: '-168.8889',
  //       },
  //     },
  //     phone: '(775)976-6794 x41206',
  //     website: 'conrad.com',
  //     company: {
  //       name: 'Yost and Sons',
  //       catchPhrase: 'Switchable contextually-based project',
  //       bs: 'aggregate real-time technologies',
  //     },
  //   },
  //   {
  //     id: 10,
  //     name: 'Clementina DuBuque',
  //     username: 'Moriah.Stanton',
  //     email: 'Rey.Padberg@karina.biz',
  //     address: {
  //       street: 'Kattie Turnpike',
  //       suite: 'Suite 198',
  //       city: 'Lebsackbury',
  //       zipcode: '31428-2261',
  //       geo: {
  //         lat: '-38.2386',
  //         lng: '57.2232',
  //       },
  //     },
  //     phone: '024-648-3804',
  //     website: 'ambrose.net',
  //     company: {
  //       name: 'Hoeger LLC',
  //       catchPhrase: 'Centralized empowering task-force',
  //       bs: 'target end-to-end models',
  //     },
  //   },
  // ];

  // useEffect(() => {
  //   const fetchData = () => {
  //     users.forEach(async (user: any) => {
  //       try {
  //         await addDoc(collection(db, 'users'), user);
  //       } catch (e) {
  //         console.error('Error adding document: ', e);
  //       }
  //     });
  //   };

  //   fetchData();
  // }, []);

  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent>
            <View style={{flex: 1}}>
              <TextComponent text={`Hi, ${user?.email}`} />
              <TitleComponent text="Be Productive today" />
            </View>

            <TouchableOpacity onPress={async () => auth.signOut()}>
              <Logout size={22} color="coral" />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate('SearchScreen')}>
            <TextComponent color={colors.gray1} text="Search task..." />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent text="30/40 tasks done" />
                <SpaceConponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text="Match 22"
                    onPress={() => console.log('onpress')}
                  />
                </RowComponent>
              </View>
              <View>
                <CicularComponent value={80} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>

        <SectionComponent>
          <RowComponent styles={{alignItems: 'flex-start'}}>
            <View style={{flex: 1}}>
              <CardImageComponent color="rgba(113, 77, 217, 0.9)">
                <TouchableOpacity
                  onPress={() => {}}
                  style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="UX Design" />
                <TextComponent text="Task management mobile app" />

                <View style={{marginVertical: 24}}>
                  <AvatarGroup />
                  <ProgressBarComponent
                    size="large"
                    percent="70%"
                    color={colors.blue1}
                  />
                </View>
                <TextComponent
                  text="Due, 2023 Match 03"
                  size={12}
                  color={colors.desc}
                />
              </CardImageComponent>
            </View>
            <SpaceConponent width={16} />
            <View style={{flex: 1}}>
              <CardImageComponent color="rgba(33, 150, 243, 0.9)">
                <TouchableOpacity
                  onPress={() => {}}
                  style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="API Payment" />
                <AvatarGroup />
                <ProgressBarComponent percent="40%" color={colors.green} />
              </CardImageComponent>
              <SpaceConponent height={16} />
              <CardImageComponent color="rgba(18, 181, 22, 0.9)">
                <TouchableOpacity
                  onPress={() => {}}
                  style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="Update work" />
                <TextComponent text="Revision home page" />
              </CardImageComponent>
            </View>
          </RowComponent>
        </SectionComponent>

        <SectionComponent>
          <TitleComponent text="Urgents tasks" />
          <CardComponent>
            <RowComponent>
              <CicularComponent value={40} radius={36} />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingLeft: 12,
                }}>
                <TextComponent text="Title of task" />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </Container>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNewTask')}
          activeOpacity={1}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              borderRadius: 100,
              width: '80%',
              padding: 16,
            },
          ]}>
          <TextComponent text="Add new task" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
