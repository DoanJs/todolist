import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {TaskModel} from '../../models/TaskModel';
import SectionComponent from '../../components/SectionComponent';
import InputComponent from '../../components/InputComponent';
import {SearchNormal1} from 'iconsax-react-native';
import {colors} from '../../contants/colors';

const ListTasks = ({navigation, route}: any) => {
  const {tasks} = route.params;
  const [data, setData] = useState<TaskModel[]>([]);
  const [searchKey, setSearchKey] = useState('');
  const [results, setResults] = useState<TaskModel[]>([]);

  useEffect(() => {
    tasks && setData(JSON.parse(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!searchKey) {
      setResults([]);
    } else {
      handleFilterTask();
    }
  }, [searchKey]);

  const handleFilterTask = () => {
    const items = data.filter(element =>
      element.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()),
    );

    setResults(items);
  };

  return (
    <Container back title="List Tasks">
      <SectionComponent styles={{}}>
        <InputComponent
          value={searchKey}
          onChange={val => setSearchKey(val)}
          placeholder="Search..."
          allowClear
          prefix={<SearchNormal1 color={colors.gray2} size={20} />}
        />
      </SectionComponent>
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={searchKey ? results : data}
        ListEmptyComponent={
          <SectionComponent>
            <TextComponent text="Data not found!!!" />
          </SectionComponent>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginBottom: 24,
            }}
            key={item.id}
            onPress={() =>
              navigation.navigate('TaskDetailScreen', {id: item.id})
            }>
            <TitleComponent text={item.title} line={2} />
            <TextComponent text={item.description} line={2} />
          </TouchableOpacity>
        )}
      />
    </Container>
  );
};

export default ListTasks;
