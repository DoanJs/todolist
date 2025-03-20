import {
  Edit2,
  Element4,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AvatarGroup from '../components/AvatarGroup';
import CardComponent from '../components/CardComponent';
import CardImageComponent from '../components/CardImageComponent';
import CicularComponent from '../components/CicularComponent';
import Container from '../components/Container';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import SpaceConponent from '../components/SpaceConponent';
import TagComponent from '../components/TagComponent';
import TextComponent from '../components/TextComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../contants/colors';
import {globalStyles} from '../styles/globalStyles';
import ProgressBarComponent from '../components/ProgressBarComponent';

const HomeScreen = () => {
  return (
    <Container>
      <SectionComponent>
        <RowComponent justify="space-between">
          <Element4 size={24} color={colors.desc} />
          <Notification size={24} color={colors.desc} />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <TextComponent text="Hi, Jason" />
        <TitleComponent text="Be Productive today" />
      </SectionComponent>

      <SectionComponent>
        <RowComponent
          styles={[globalStyles.inputContainer]}
          onPress={() => console.log('ok')}>
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
                <ProgressBarComponent size='large' percent='70%' color={colors.blue1}/>
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
              <ProgressBarComponent percent='40%' color={colors.green}/>

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
    </Container>
  );
};

export default HomeScreen;
