from app.models import db, Business

def seed_businesses():

    business1 = Business(
        user_id = 1,
        name = 'Franklin Barbecue',
        address = '900 E 11th St',
        city = 'Austin',
        state = 'TX',
        zipcode = 78702,
        country = 'US',
        phone_number = '5126531187',
        website = 'https://franklinbbq.com',
        min_price = 20,
        max_price = 40
    )
    business2 = Business(
        user_id = 1,
        name = 'Moonshine Patio Bar & Grill',
        address = '303 Red River St Austin',
        city = 'Austin',
        state = 'TX',
        zipcode = 78701,
        country = 'US',
        phone_number = '5122369599',
        website = 'http://www.moonshinegrill.com',
        min_price = 15,
        max_price = 35
    )
    business3 = Business(
        user_id = 2,
        name = 'Uchi',
        address = '801 South Lamar Blvd',
        city = 'Austin',
        state = 'TX',
        zipcode = 78704,
        country = 'US',
        phone_number = '5129164808',
        website = 'https://uchiaustin.com',
        min_price = 80,
        max_price = 150
    )
    business4 = Business(
        user_id = 2,
        name = 'Mongers Market + Kitchen',
        address = '4119 Guadalupe St',
        city = 'Austin',
        state = 'TX',
        zipcode = 78751,
        country = 'US',
        phone_number = '5122158972',
        website = 'http://www.mongersaustin.com',
        min_price = 20,
        max_price = 30
    )
    business5 = Business(
        user_id = 3,
        name = 'Lick Honest Ice Creams',
        address = '1100 S Lamar Blvd Ste 1135',
        city = 'Austin',
        state = 'TX',
        zipcode = 78704,
        country = 'US',
        phone_number = '5123635622',
        website = 'http://ilikelick.com',
        min_price = 5,
        max_price = 10
    )
    business6 = Business(
        user_id = 4,
        name = "Amy's Ice Creams",
        address = '1012 W 6th St',
        city = 'Austin',
        state = 'TX',
        zipcode = 78703,
        country = 'US',
        phone_number = '5128865737',
        website = 'http://www.amysicecreams.com/',
        min_price = 3,
        max_price = 10
    )
    business7 = Business(
        user_id = 5,
        name = 'Mitchells Ice Cream',
        address = '688 San Jose Ave',
        city = 'San Francisco',
        state = 'CA',
        zipcode = 94110,
        country = 'US',
        phone_number = '4156482300',
        website = 'https://mitchellsicecream.com',
        min_price = 2,
        max_price = 10
    )
    business8 = Business(
        user_id = 6,
        name = 'Fog Harbor Fish House',
        address = '39 Pier Ste a - 202',
        city = 'San Francisco',
        state = 'CA',
        zipcode = 94133,
        country = 'US',
        phone_number = '4159692010',
        website = 'https://fogharbor.com',
        min_price = 20,
        max_price = 40
    )
    business9 = Business(
        user_id = 6,
        name = 'Wako Japanese Restaurant',
        address = '211 Clement St',
        city = 'San Francisco',
        state = 'CA',
        zipcode = 94118,
        country = 'US',
        phone_number = '4156824875',
        website = 'http://www.sushiwakosf.com',
        min_price = 90,
        max_price = 200
    )
    business10 = Business(
        user_id = 7,
        name = 'Crab House at Pier 39',
        address = '203 C Pier 39',
        city = 'San Francisco',
        state = 'CA',
        zipcode = 94133,
        country = 'US',
        phone_number = '4156512574',
        website = 'https://crabhouse39.com',
        min_price = 50,
        max_price = 70
    )
    business11 = Business(
        user_id = 7,
        name = 'Basa Seafood Express',
        address = '3064 24th St',
        city = 'San Francisco',
        state = 'CA',
        zipcode = 94110,
        country = 'US',
        phone_number = '4155502388',
        website = 'http://basaseafoodsf.com',
        min_price = 5,
        max_price = 10
    )
    business12 = Business(
        user_id = 8,
        name = 'Crab House All You Can Eat Seafood',
        address = '135 E 55th St',
        city = 'New York',
        state = 'NY',
        zipcode = 10022,
        country = 'US',
        phone_number = '5126531187',
        website = 'http://www.crabhouseny.com',
        min_price = 90,
        max_price = 120
    )
    business13 = Business(
        user_id = 8,
        name = 'Sup Crab',
        address = '97 Bowery',
        city = 'New York',
        state = 'NY',
        zipcode = 10002,
        country = 'US',
        phone_number = '2129258083',
        website = 'https://supcrab.com',
        min_price = 50,
        max_price = 70
    )
    business14 = Business(
        user_id = 9,
        name = 'Surreal Creamery',
        address = '538 2nd Ave',
        city = 'New York',
        state = 'NY',
        zipcode = 10016,
        country = 'US',
        phone_number = '6465903575',
        website = 'https://www.surrealcreamery.com',
        min_price = 20,
        max_price = 30
    )
    business15 = Business(
        user_id = 9,
        name = 'Taiyaki NYC',
        address = '119 Baxter St',
        city = 'New York',
        state = 'NY',
        zipcode = 10013,
        country = 'US',
        phone_number = '2129662882',
        website = 'http://taiyakinyc.com',
        min_price = 5,
        max_price = 10
    )
    business16 = Business(
        user_id = 10,
        name = 'Club A Steakhouse',
        address = '240 E 58th St',
        city = 'New York',
        state = 'NY',
        zipcode = 10022,
        country = 'US',
        phone_number = '2126884190',
        website = 'http://www.clubasteakhouse.com/',
        min_price = 50,
        max_price = 75
    )

    db.session.add(business1)
    db.session.add(business2)
    db.session.add(business3)
    db.session.add(business4)
    db.session.add(business5)
    db.session.add(business6)
    db.session.add(business7)
    db.session.add(business8)
    db.session.add(business9)
    db.session.add(business10)
    db.session.add(business11)
    db.session.add(business12)
    db.session.add(business13)
    db.session.add(business14)
    db.session.add(business15)
    db.session.add(business16)


    db.session.commit()


def undo_businesses():
    db.session.execute('TRUNCATE businesses RESTART IDENTITY CASCADE;')
    db.session.commit()
