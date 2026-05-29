# Kinsou MMA — Database Schema

## gyms
- id (uuid)
- name (text)
- created_at (timestamp)

## profiles
- id (uuid)
- gym_id (uuid)
- name (text)
- age (integer)
- gender (text)
- weight_class (text)
- experience (text)
- height (integer)
- role (text)
- subscription_end_date (timestamp)
- created_at (timestamp)

## tournaments
- id (uuid)
- gym_id (uuid)
- name (text)
- min_age (integer)
- level (text)
- tournament_date (timestamp)
- enrollment_deadline (timestamp)
- created_at (timestamp)

## tournament_enrollments
- id (uuid)
- student_id (uuid)
- tournament_id (uuid)
- enrolled_at (timestamp)

## calendar_events
- id (uuid)
- gym_id (uuid)
- type (text)
- instructor (text)
- day_of_week (text)
- session_time (time)
- is_recurring (boolean)
- specific_date (timestamp)
- created_at (timestamp)

## gym_equipment
- id (uuid)
- gym_id (uuid)
- name (text)
- price (integer)
- image_url (text)
- available (boolean)
- created_at (timestamp)

## equipment_orders
- id (uuid)
- gym_id (uuid)
- student_id (uuid)
- gym_equipment_id (uuid)
- status (text)
- price (integer)
- created_at (timestamp)

## drills
- id (uuid)
- gym_id (uuid)
- name (text)
- type (text)
- description (text)
- video_url (text)
- date (timestamp)
- created_at (timestamp)