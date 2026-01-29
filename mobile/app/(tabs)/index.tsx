import ChatItem from "@/components/ChatItem";
import EmptyChats from "@/components/EmptyChats";
import { useChats } from "@/hooks/useChats";
import { Chat } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Text,
  ActivityIndicator,
  View,
  FlatList,
  Pressable,
} from "react-native";

const ChatsTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error } = useChats();
  if (isLoading) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <ActivityIndicator size={"large"} color={"#f4A251"} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-surface items-center justify-center">
        <Text className="text-red-500">Failed to load chats</Text>
      </View>
    );
  }
  const handleChatpress = (chat: Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };
  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={() => handleChatpress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 20,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyChats
            title="No Chats Yet"
            subtitle="Start a conversation with someone!"
            iconName="chatbubbles-outline"
            iconColor="#6B6B70"
            iconSize={64}
            onPressButton={() => console.log("pressed")}
          />
        }
      />
    </View>
  );
};

export default ChatsTab;

function Header() {
  const router = useRouter();
  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">Chats</Text>
        <Pressable
          className="size-10 bg-primary rounded-full items-center justify-center"
          //onPress={() => router.push("/new-chat")}
        >
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />{" "}
        </Pressable>
      </View>
    </View>
  );
}
