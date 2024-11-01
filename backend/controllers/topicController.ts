import { Request, Response } from 'express';
import pool from '../config/dbConfig';

const dailyTopics = [
    {
        topicName: 'Acceptance',
        description:
            'Exploring the importance of acceptance in one’s recovery journey, including accepting one’s addiction and accepting help from others.',
    },
    {
        topicName: 'Attitude of Gratitude',
        description: 'Focusing on the role of thankfulness in maintaining sobriety and enhancing the quality of life.',
    },
    {
        topicName: 'Belief in a Higher Power',
        description:
            'Discussing the concept of a Higher Power and its place in recovery, emphasizing individual interpretation.',
    },
    {
        topicName: 'Complacency',
        description:
            'Addressing the dangers of becoming too comfortable or lackadaisical in recovery, potentially leading to relapse.',
    },
    {
        topicName: 'Contempt Prior to Investigation',
        description:
            'Encouraging an open mind and resisting the urge to dismiss new ideas or approaches without exploring them fully.',
    },
    {
        topicName: 'Dependence',
        description: 'Discussing the nature of addiction as a dependence and examining strategies to break the cycle.',
    },
    {
        topicName: 'Fear',
        description: 'Unpacking the fear of sobriety, change, or failure, and exploring coping mechanisms.',
    },
    {
        topicName: 'Forgiveness',
        description: 'Exploring the concept of forgiveness, both of oneself and others, as a healing tool.',
    },
    {
        topicName: 'Freedom through Sobriety',
        description:
            'Discussing the liberating aspect of recovery, including the freedom from physical and emotional dependence on alcohol.',
    },
    {
        topicName: 'Group Inventory',
        description:
            'Evaluating the group’s effectiveness, addressing potential improvements, and fostering a sense of collective responsibility.',
    },
    {
        topicName: 'Hope',
        description:
            'Highlighting the role of hope in recovery and sharing experiences of how hope has aided members’ sobriety.',
    },
    {
        topicName: 'Humility',
        description: 'Discussing humility’s role in recovery and how recognizing one’s limitations can lead to growth.',
    },
    {
        topicName: 'Identification',
        description:
            'Exploring the importance of identifying as a person in recovery, and how this self-identification shapes one’s journey.',
    },
    {
        topicName: 'Inadequacy',
        description: 'Discussing feelings of inadequacy, how they can fuel addiction, and strategies to combat them.',
    },
    {
        topicName: 'Inventory',
        description:
            'Discussing the concept of taking personal inventory, evaluating one’s strengths and weaknesses, and planning for improvement.',
    },
    {
        topicName: 'Letting Go of Anger',
        description: 'Discussing the destructive nature of anger and strategies to release it in a healthy manner.',
    },
    {
        topicName: 'Let’s Be Friendly with Our Friends',
        description: 'Exploring the importance of healthy relationships during recovery, and how to nurture them.',
    },
    // Add more topics here...
];

// Populate daily topics
export const populateTopics = async (req: Request, res: Response) => {
    try {
        for (const topic of dailyTopics) {
            await pool.query('INSERT INTO topics (topic_name, description, date) VALUES ($1, $2, CURRENT_DATE)', [
                topic.topicName,
                topic.description,
            ]);
        }
        res.status(201).json({ message: 'Daily topics populated successfully' });
    } catch (error) {
        console.error('Error populating daily topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all topics
export const getTopics = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM topics ORDER BY date DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
