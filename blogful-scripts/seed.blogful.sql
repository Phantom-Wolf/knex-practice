BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)
VALUES
    ('Shrimp is the Best Meal', now() - '21 days'::INTERVAL, 'mmm, shrimp'),
    ('Hammer Time', now() - '21 days'::INTERVAL, 'mmm, hammers'),
    ('Gardening Pro Tips', now() - '20 days'::INTERVAL, 'mmm, gardens'),
    ('Steak is Better than Shrimp', now() - '18 days'::INTERVAL, 'mmm, steak'),
    ('Aussies are the Best Dogs', now() - '17 days'::INTERVAL, 'mmm, dogs'),
    ('The Lord is our Savior', now() - '17 days'::INTERVAL, 'mmm, hallelujah'),
    ('Operate a Tight Ship', now() - '16 days'::INTERVAL, 'mmm, ships'),
    ('Trucks are Better than Cars', now() - '14 days'::INTERVAL, 'mmm, trucks'),
    ('Galaxy S20 Ultra is Awesome', now() - '13 days'::INTERVAL, 'mmm, S20'),
    ('Pink is a Fake Color', now() - '12 days'::INTERVAL, 'ew, pink'),
    ('Beauty and The Beast is a Good Book', now() - '11 days'::INTERVAL, 'mmm, books'),
    ('Why I love Programming', now() - '10 days'::INTERVAL, 'mmm, programming'),
    ('You Should Always be Learning', now() - '10 days'::INTERVAL, 'mmm, learning');

COMMIT;