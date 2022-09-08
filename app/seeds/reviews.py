from app.models import db, Review

def seed_reviews():

    review1 = Review(
        user_id = 7,
        business_id = 1,
        content = 'The food was great.   Customer service was very efficient and the fact that they are only open for limited hours is more desirable',
        rating = 1
    )
    review2 = Review(
        user_id = 2,
        business_id = 1,
        content = 'BOMB!! Explosion in your taste buds! Franklin is the man who represents true Texas BBQ!',
        rating = 2
    )
    review3 = Review(
        user_id = 6,
        business_id = 1,
        content = """Man, what can be said about Franklin that hasn't been said already?

                    It's incredible! We got in line around 8:00am and we're eating about an hour after they opened at 11:00am.

                    Plenty of tables and shade to sit in, and they open the lobby so that gas can buy any general items on sale from their little store, as well as use the bathroom while waiting.

                    We had a selection of meats and all were outstanding. We didn't order any sides, we have had them before and while they taste good, they are very simple offerings and not the stars of the show - we stuck to the smoked meats.

                    Franklin's really is a place you need to plan for and make a morning of, so no swinging by - but we try to get there at least once a year because it is still so outstanding.

                    Turkey, Ribs, Brisket, Beef Ribs""",
        rating = 3
    )
    review4 = Review(
        user_id = 8,
        business_id = 2,
        content = 'Love this bar! The interior design is very warm and upscale. The vibe is great. Love that they have live music and host local art during events. Check it out.',
        rating = 4
    )
    review5 = Review(
        user_id = 3,
        business_id = 2,
        content = 'Garrett Faulkner is the BEST waiter. LOVE him! let us chat and catch up with our table. no pressure! Love him. Hands down ask for him!!!',
        rating = 5
    )
    review6 = Review(
        user_id = 5,
        business_id = 2,
        content = """After a mediocre dinner at another place the previous night,
                     I was not expecting much. Well I was WRONG, oh so wrong. Moonshine was
                     A-MAZ-ING!!! We sat down and was promptly greeted with a bucket of the
                     most amazing popcorn and drinks. The whisky/bourbon offerings are many
                     and diverse- impressive. We ordered the corn dog shrimp and was blown
                     away. I hate ordering apps and you get three for two or four people...
                     well not here! 4 pieces of the best shrimp fried in a corn dog batter.
                     I wasn't so sure about the honey mustard with blueberry swirl dipping
                     sauce.... Once again, blown away. The trout was out of this world! Now
                     you need to know, I'm very particular about my fish and never order
                     fish in restaurants. I'll be honest, I was more intrigued by the
                     cornbread bacon stuffing more than anything and thought I'd take a
                     chance on the fish.  It was the very best fish and stuffing I have ever
                     had! The fish was perfect, flaky and the sauce- the sauce!!!
                     We will definitely be back and I have found 'my dish'!!!""",
        rating = 1
    )
    review7 = Review(
        user_id = 1,
        business_id = 3,
        content = """Sooo...What is the first thing a girl looks for when moving into a new town/state? Yep...where am I going to eat? (Yes, it's sad but true)

                     Made a reservation for date night with the bf and wasn't disappointed. I wanted to try everything but settled on about 6 or 7 things.  Glad that the staff suggested the Hama Chili since yellowtail is my favorite. It was so good! We also had the karage, the uni, the hot rock, the spicy tuna, and some other items (can't remember the names-sorry!).

                     Definitely a great place to come and I will be going back, but my bank account would prefer it not be everyday.""",
        rating = 2
    )
    review8 = Review(
        user_id = 6,
        business_id = 3,
        content = 'It started raining in the middle of our meal and we were very quickly moved to a covered table, which was nice! Food-wise, our favorites were the verde maki and hamachi collar; and of course, I also loved the brussels sprouts and foie gras sushi.',
        rating = 3
    )
    review9 = Review(
        user_id = 9,
        business_id = 4,
        content = "Holy moly, wasn't expecting this big beautiful interior of a restaurant from the outside. Service was spot on. I was here for a Galentine's date. We opted to just split a few appetizers and our waiter was kind enough to course it out for us and also split it so it wasn't family style. Certainly felt special!",
        rating = 4
    )
    review10 = Review(
        user_id = 10,
        business_id = 4,
        content = 'A cute and delicate restaurant with some interesting music lol.',
        rating = 5
    )
    review11 = Review(
        user_id = 2,
        business_id = 5,
        content = 'I have a huge sweet tooth and along with that comes with an obsession to try all the ice cream places across the US.',
        rating = 1
    )
    review12 = Review(
        user_id = 7,
        business_id = 5,
        content = 'I constantly crave ice cream and this is a great option with a lactose intolerant husband who usually has to avoid ice cream at all costs. ',
        rating = 2
    )
    review13 = Review(
        user_id = 8,
        business_id = 6,
        content = 'watch out these people that work here are hella intense... but the ice cream is great xD',
        rating = 3
    )
    review14 = Review(
        user_id = 3,
        business_id = 6,
        content = 'Delicious. This is the location most students go to. Sometimes my student org will host a tab here, and it is a popular event.',
        rating = 4
    )
    review15 = Review(
        user_id = 1,
        business_id = 7,
        content = 'This ice cream was delicious. Incredibly sweet, but tasty nonetheless. The girl serving us was very kind about giving my mom and I at least ten samples.',
        rating = 5
    )
    review16 = Review(
        user_id = 6,
        business_id = 7,
        content = 'Mitchells is my favorite ice cream shop by a long shot. First they are incredibly old-school San Francisco, just a classic institution.',
        rating = 1
    )
    review17 = Review(
        user_id = 4,
        business_id = 8,
        content = 'Food was great! Took a little long to get seated even though we had a reservation but the manager was nice to apologize and offered a free appetizer.',
        rating = 2
    )
    review18 = Review(
        user_id = 5,
        business_id = 8,
        content = 'My friends and I stumbled across this place on our Pier 39 tour, and ended our contemplation by ordering dinner here. To test the place out, I ordered cod. ',
        rating = 3
    )
    review19 = Review(
        user_id = 7,
        business_id = 9,
        content = 'Good sushi and a great price for an omkase experience around ~$100 a person. Belt fish was our favorite as this is not commonly found in other sushi places. Uni and blue fin tuna were great.',
        rating = 4
    )
    review20 = Review(
        user_id = 2,
        business_id = 9,
        content = 'After a disappointing first dinner, my hubby took matters in his own hands and made last minute reservations at Wako on our last night in SF. We were seated at the bar and got to see the chefs in action. It was chilly, so I ordered a pot of genmaicha and he opted for some hot sake.',
        rating = 5
    )
    review21 = Review(
        user_id = 9,
        business_id = 10,
        content = 'Food was incredible. That staff is the worst. Not friendly at all. No one smiles or invites you back. They treat you like a paycheck and not a guest. I am used to hosts being new and nervous but she looked irritated that she even had to work. We got seated on time after being quoted a weight time.',
        rating = 1
    )
    review22 = Review(
        user_id = 10,
        business_id = 11,
        content = 'Simple little shop that has both food to order and grab and go items. Currently there is no indoor seating',
        rating = 2
    )
    review23 = Review(
        user_id = 1,
        business_id = 12,
        content = 'I love Crab House sooooo much ! The fried and butter lobster is amazing. The shrimp. The crab legs. Everything is A1.',
        rating = 3
    )
    review24 = Review(
        user_id = 3,
        business_id = 12,
        content = 'My boyfriend and I have been here twice thus far and we continue to be satisfied.',
        rating = 4
    )
    review25 = Review(
        user_id = 6,
        business_id = 11,
        content = "I think this might be the best poke I've had in the Bay Area and I'm so glad my friend told me about it! We got the poke combo with the spicy salmon poke and a sushi combo.",
        rating = 5
    )
    review26 = Review(
        user_id = 7,
        business_id = 13,
        content = "It's my second visit here and this time, I brought my family.",
        rating = 1
    )
    review27 = Review(
        user_id = 2,
        business_id = 13,
        content = 'Supcrab delivers to my area at least once a week. Aside from fresh seafood (seafood boil or cooked Chinese style), they have a ton of authentic Chinese (Cantonese, Sichuan...) and Malaysian dishes, as well as select items from a few partners.',
        rating = 2
    )
    review28 = Review(
        user_id = 3,
        business_id = 14,
        content = 'Overrated. If ur asking to pay this much $$$ for ice cream, the taste better blow my mind. I ordered vanilla Oreo, and honestly, the best part of the ice cream was the Oreos.',
        rating = 3
    )
    review29 = Review(
        user_id = 1,
        business_id = 14,
        content = "I have no words because it was so surreal! Talking about hot, this one cools you down. There's nothing to brag about except it was over-the-top delicious ice cream that I thought I would not have accepted the challenge to finish it.",
        rating = 4
    )
    review30 = Review(
        user_id = 2,
        business_id = 14,
        content = 'We were looking for some post dinner ice cream and read the great reviews. It was quite a busy place but the line was quick.',
        rating = 5
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)
    db.session.add(review11)
    db.session.add(review12)
    db.session.add(review13)
    db.session.add(review14)
    db.session.add(review15)
    db.session.add(review16)
    db.session.add(review17)
    db.session.add(review18)
    db.session.add(review19)
    db.session.add(review20)
    db.session.add(review21)
    db.session.add(review22)
    db.session.add(review23)
    db.session.add(review24)
    db.session.add(review25)
    db.session.add(review26)
    db.session.add(review27)
    db.session.add(review28)
    db.session.add(review29)
    db.session.add(review30)


    db.session.commit()




def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
