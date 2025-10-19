export type Data = {
    totalMessagesSent: TotalMessages;
    totalMessagesReceived: TotalMessages;
    emojiFrequency: EmojiFrequency[];
    topFriends: TopFriend[];
    wordFrequency: WordFrequency[];
    activityTimeline: ActivityTimeline[];
};

export type TotalMessages = {
    content_count: number;
    audio_files_count: number;
    share_count: number;
    photos_count: number;
    videos_count: number;
    total: number;
}

export type EmojiFrequency = {
    emoji: string;
    freq: number;
}

export type TopFriend = {
    friend_name: string;
    sent_amount: number;
    received_amount: number;
}

export type WordFrequency = {
    word: string;
    freq: number;
}

export type ActivityTimeline = {
    content_count: number;
    audio_files_count: number;
    share_count: number;
    photos_count: number;
    videos_count: number;
    total: number;
}

