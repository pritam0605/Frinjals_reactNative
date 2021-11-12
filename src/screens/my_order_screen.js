/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import colors from '../themes/colors';
import CommonStyles from '../themes/styles';
import Toast from 'react-native-easy-toast';
import {connect} from 'react-redux';
import {appAction} from '../store/actions/appActions';
import {authAction} from '../store/actions/authActions';
import Header from '../components/header';
import {BackgroundPattern} from '../components/background_pattern';
import moment from 'moment';
const MyOrderScreen = ({...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [myOrders, setMyOrders] = useState([]);
  const toastRef = useRef(null);
  React.useEffect(() => {
    getMyOrders();
  }, []);
  const getMyOrders = () => {
    setIsLoading(true);
    props
      .getOrderList()
      .then(res => setMyOrders(res))
      .catch(e => toastRef?.current.show(e, 1000))
      .finally(() => setIsLoading(false));
  };
  const _onclick = item => {
    props.navigation.navigate('orderDetail', {item});
  };
  return (
    <BackgroundPattern>
      <SafeAreaView style={CommonStyles.safeAreaView}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Header {...props} />
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            data={myOrders}
            keyExtractor={item => item.id + ''}
            renderItem={({item}) => (
              <RenderOrder item={item} onclick={_onclick} />
            )}
            ItemSeparatorComponent={() => <View style={{height: 8}} />}
            onEndReachedThreshold={0.01}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getMyOrders}
                tintColor={colors.color7B7}
              />
            }
            initialNumToRender={6}
            maxToRenderPerBatch={2}
          />
        </View>
        <Toast ref={toastRef} position="bottom" />
      </SafeAreaView>
    </BackgroundPattern>
  );
};
const RenderOrder = React.memo(({item, onclick}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onclick(item)}
      style={styles.card}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.resTitle}>{item?.restorant?.name}</Text>
          <Text style={styles.resAdd}>{item?.restorant?.address}</Text>
        </View>
        <View>
          <Text style={styles.orderStatus}>
            {item?.last_status[0]?.name || 'undefined'}
          </Text>
        </View>
      </View>
      <Text style={styles.totAmount}>{'₹ ' + item?.order_price}</Text>
      <View
        style={{
          height: 0.55,
          marginVertical: 6,
          backgroundColor: colors.color7B7,
        }}
      />
      <View
        style={{
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        {item?.items.map(i => (
          <Text style={styles.itemTitle} key={i.id + ''}>
            {i.name + 'X' + i.pivot.qty + ', '}
          </Text>
        ))}
      </View>
      <Text style={styles.orderTime}>
        {moment(item?.created_at).format('DD MMM, hh:mm a')}
      </Text>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  card: {
    backgroundColor: colors.colorFFF,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderRadius: 6,
    elevation: 2,
  },
  resTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: colors.colorFC0,
  },
  resAdd: {
    fontSize: 13,
    color: colors.color4F4,
  },
  orderStatus: {
    fontSize: 14,
  },
  totAmount: {
    marginVertical: 4,
    fontSize: 15,
  },
  itemTitle: {
    fontSize: 14,
    color: colors.color4F4,
  },
  orderTime: {
    marginVertical: 4,
  },
});
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getOrderList: () => dispatch(appAction.getOrderList()),
    doLogout: () => dispatch(authAction.doLogout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyOrderScreen);
