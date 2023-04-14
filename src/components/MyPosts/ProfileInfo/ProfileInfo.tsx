import  { FC, memo, useCallback, useState } from "react";
import style from "./ProfileInfo.module.scss";
import { EditableSpan } from "../../EditableSpan/EditableSpan";
import { ProfileForm } from "./EditProfileForm/ProfileForm";
import { ProfileInfoPropsType } from "./ProfileInfoContainer";
import FollowUnfollowBtn from "../../FollowUnfollowBtn/FollowUnfollowBtn";
import { ProfileAvatar } from "./ProfileAvatar/ProfileAvatar";
import { Modal } from "../../Modal/Modal";

export const ProfileInfo: FC<ProfileInfoPropsType> = memo(
  ({
    profile,
    updateUserStatus,
    status,
    saveProfileAvatar,
    userIdAuth,
    updateProfile,
    totalUserCount,
    users,
  }) => {
    const [isModalShown, setIsModalShown] = useState(false);

    const isOwner = userIdAuth === profile.userId;

    const currentUser = users.find((user) => user.id === profile.userId);

    const valuesForUpdateProfile = [
      {
        title: "About me",
        type: "textarea",
        initialValueTitle: "aboutMe",
        initialValue: profile.aboutMe,
      },
      {
        title: "Full name",
        type: "input",
        initialValueTitle: "fullName",
        initialValue: profile.fullName,
      },
      {
        title: "Looking for a job?",
        type: "checkbox",
        initialValueTitle: "lookingForAJob",
        initialValue: profile.lookingForAJob,
      },
      {
        title: "Describe your job",
        type: "input",
        initialValueTitle: "lookingForAJobDescription",
        initialValue: profile.lookingForAJobDescription,
      },
    ];

    const handleEditableSpanClick = useCallback(
      (newTitle: string) => {
        if (newTitle !== profile.fullName) {
          updateProfile({ fullName: newTitle });
        }
      },
      [profile.fullName, updateProfile]
    );

    const onEditProfileClick = () => {
      setIsModalShown(true);
    };

    return (
      <div className={style.profileInfoWrapper}>
        {isModalShown && (
          <Modal
            itemsForForm={valuesForUpdateProfile}
            onSubmitBtnClick={updateProfile}
            setIsModalShown={setIsModalShown}
          />
        )}
        <div className={style.headerBlock}>
          <div className={style.flexCont}>
            <ProfileAvatar
              isOwner={isOwner}
              photo={profile.photos.small}
              saveProfileAvatar={saveProfileAvatar}
            />

            <div className={style.nameBlock}>
              <EditableSpan
                title={profile.fullName}
                updateTitle={handleEditableSpanClick}
                myStyle={style.name}
                isOwner={isOwner}
              />
              <EditableSpan
                title={status}
                updateTitle={updateUserStatus}
                myStyle={style.status}
                isOwner={isOwner}
              />
            </div>
          </div>

          {!isOwner && currentUser && <FollowUnfollowBtn item={currentUser} />}

          {isOwner && (
            <div className={style.settingsBtn} onClick={onEditProfileClick} />
          )}
        </div>
        <ProfileForm
          contacts={profile.contacts}
          aboutMe={profile.aboutMe}
          isOwner={isOwner}
          updateProfile={updateProfile}
          followingUsers={users}
          totalUserCount={totalUserCount}
        />
      </div>
    );
  }
);
