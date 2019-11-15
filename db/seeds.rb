# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(
  [
    { name: 'Serjio' },
    { name: 'Xenita' },
  ]
)

default_groups = [
  {
    name: 'products',
    recipients: [
      'rewe',
      'ygueney',
      'edeka',
      'lidl',
      'spar',
      'zoettl',
      'pacande',
      'agip',
    ]
  },
  {
    name: 'bike',
    recipients: [
      'bike',
      'chainreact',
    ]
  },
  {
    name: 'transport',
    recipients: [
      'mvg',
    ]
  },
  {
    name: 'travel',
    recipients: [
      'db',
      'oebb',
    ]
  },
  {
    name: 'pharmacies',
    recipients: [
      'apotheke',
    ]
  },
  {
    name: 'restaurants',
    recipients: [
      'cafe',
      'tassilogarten',
      'osteria',
      'taverne',
      'foodarts',
      'chiang shing asiatisches',
      'neuhausen',
      'gastro',
      'jaegers',
      'elv',
      'h.i.g.',
      'mohrs+eckel'
    ]
  },
  {
    name: 'electronics',
    recipients: [
      'saturn',
      'conrad'
    ]
  },
  {
    name: 'shopping',
    recipients: ['santoloco', 'sport scheck']
  },
  {
    name: 'entertainment',
    recipients: [
      'filmtheater',
      'kletterwelt'
    ],
  }
]

default_groups.each do |entry|
  group = Group.create(name: entry[:name])
  entry[:recipients].each do |recipient|
    Recipient.create(group: group, name: recipient, match: recipient)
  end
end
