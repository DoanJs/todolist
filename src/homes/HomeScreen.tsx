import {Element4, Notification, SearchNormal1} from 'iconsax-react-native';
import React from 'react';
import {Alert, View} from 'react-native';
import CardComponent from '../components/CardComponent';
import Container from '../components/Container';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import TagComponent from '../components/TagComponent';
import TextComponent from '../components/TextComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../contants/colors';
import {globalStyles} from '../styles/globalStyles';
import SpaceConponent from '../components/SpaceConponent';
import CicularComponent from '../components/CicularComponent';

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
    </Container>
  );
};

export default HomeScreen;
