import React, { useEffect, useState } from "react";
import Profilephoto from "./Profilephoto";
import { useUserContext } from "@/context/AuthContext";
import { useFriends } from "@/lib/react-query/queries";
import { Button } from "../ui/button";
import Loader from "./Loader";
import { addFriend } from "@/lib/api";
import { toast } from "../ui";

type ShowFriendListProps = {
  list: any; // Replace 'any' with the type of your friend data
};

const ShowFriendList: React.FC<ShowFriendListProps> = ({ list }) => {
  const { user } = useUserContext();

  const { data: friendList, isLoading: isFriendListLoading } = useFriends(
    user.id
  );
  const { data: newfriendList, isLoading: isnewfriendListLoading } = useFriends(
    list.$id
  );

  const [IsFriend, setIsFriend] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [friendArray, setFriendArray] = useState<string[]>([]);
  const [newfriendArray, setNewFriendArray] = useState<string[]>([]);

  useEffect(() => {
    // Ensure both friendList and newfriendList data are available before updating state
    if (!isFriendListLoading && !isnewfriendListLoading) {
      setFriendArray(
        friendList?.documents[0]?.friendsId?.map(
          (item: { $id: any }) => item?.$id
        ) || []
      );
      setNewFriendArray(
        newfriendList?.documents[0]?.friendsId?.map(
          (item: { $id: any }) => item?.$id
        ) || []
      );
    }
  }, [friendList, newfriendList, isFriendListLoading, isnewfriendListLoading]);

  useEffect(() => {
    setIsFriend(
      friendArray.includes(list.$id) && newfriendArray.includes(user.id)
    );
  }, [friendArray, newfriendArray, setIsFriend]);

  const handlefollow = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      if (!IsFriend) {
        setLoading(true);
        let newloggedInFriendArray = [...friendArray];
        let newAddedFriendArray = [...newfriendArray];

        // LOGIN USER ARRAY
        if (!newloggedInFriendArray.includes(list?.$id)) {
          newloggedInFriendArray.push(list?.$id);
        }
        setFriendArray(newloggedInFriendArray);

        // NEW USER ARRAY
        if (!newAddedFriendArray.includes(user.id)) {
          newAddedFriendArray.push(user.id);
        }
        setNewFriendArray(newAddedFriendArray);

        await addFriend(list.$id);
        setIsFriend(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast({
        title: `New Friend Added Successfully.`,
      });
    }
  };

  return (
    <>
      <div className="flex">
        <div
          className="bg-slate-800 p-4 shadow-md rounded-md text-white mb-4"
          style={{ width: "340px" }}>
          <div className="flex items-center">
            <Profilephoto name={list} />
            <div className="ml-2">
              <p className="text-lg font-bold mb-1 mt-1 text-blue-500">
                Name : {list.name}
              </p>
              <p className="mb-1 ">Username : {list.UserName}</p>
            </div>
          </div>
          <Button
            type="button"
            className="shad-button_primary px-8"
            disabled={
              IsFriend ||
              isLoading ||
              isFriendListLoading ||
              isnewfriendListLoading
            }>
            {isLoading || isFriendListLoading || isnewfriendListLoading ? (
              <>
                Loading... <Loader />
              </>
            ) : IsFriend ? (
              <span onClick={handlefollow}>Added</span>
            ) : (
              <span onClick={handlefollow}>Add Friend</span>
            )}{" "}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowFriendList;
