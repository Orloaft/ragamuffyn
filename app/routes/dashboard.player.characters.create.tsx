import {
  Box,
  Button,
  Flex,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tag,
  Text,
  Image,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { calculateModifier } from "~/components/CharacterSheetForm";
import CharacterSheet from "~/components/characterSheet";

const CharacterCreation = () => {
  const [step, setStep] = useState(0);
  const [characterData, setCharacterData] = useState<any>({
    race: "Human",
    class: "Artificer",
    alignment: "Lawful_good",
    background: "Acolyte",
    attributes: {
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    },
  });
  // Utility function to roll a d6
  const rollDice = () => Math.floor(Math.random() * 6) + 1;
  const attributeDescriptions: any = {
    Strength:
      "Strength is a measure of physical power and brute force. It determines how much weight a character can carry, the damage they can inflict with physical attacks, and their effectiveness in tasks requiring sheer physical force, such as breaking down doors or arm wrestling. Characters with high Strength are typically powerful warriors and are adept at using heavy weapons and armor.",

    Dexterity:
      "Dexterity assesses agility, reflexes, and balance. This attribute is crucial for characters needing to perform acrobatic feats, stealth movements, or precise actions. It affects a character's ability in ranged combat, their armor class (which represents how hard they are to hit), and skills like sleight of hand and acrobatics. Rogues and archers often have high Dexterity.",

    Constitution:
      "Constitution represents health, stamina, and vital force. It affects a character's hit points (HP), which determine how much damage they can take before falling unconscious or dying. It also influences their resistance to poison, disease, and other bodily ailments. Characters like frontline fighters and anyone who needs to endure physical hardship benefit from a high Constitution.",

    Intelligence:
      "Intelligence is a measure of mental acuity, accuracy of recall, and the ability to reason. This attribute is important for wizards and other spellcasters who rely on knowledge to harness magical energies. It influences how many languages a character can learn, the effectiveness of investigation and knowledge-based skills, and the number of spells a magic-user can prepare.",

    Wisdom:
      "Wisdom reflects how attuned one is to the world around them and represents perceptiveness and intuition. It affects a character's insight into others' intentions, their resistance to mental influence, and their connection to nature or the divine. Clerics, druids, and characters who rely on perception and insight typically have high Wisdom scores.",

    Charisma:
      "Charisma is the ability to interact effectively with others. It includes factors like confidence, eloquence, and leadership. This attribute influences social interactions, the ability to persuade or deceive, and the effectiveness of certain types of magic. Charismatic characters are often leaders, diplomats, or spellcasters who weave magic through force of personality, like bards and sorcerers.",
  };
  // Function to handle attribute change
  const handleAttributeChange = (attribute, value) => {
    setCharacterData({
      ...characterData,
      attributes: { ...characterData.attributes, [attribute]: value },
    });
  };

  // Function to handle rolling for attributes
  const rollForAttributes = () => {
    const newAttributes: any = {};
    Object.keys(characterData.attributes).forEach((attribute) => {
      // Roll four d6 and sum the highest three
      const rolls = [rollDice(), rollDice(), rollDice(), rollDice()];
      console.log(rolls);
      rolls.sort().shift(); // Remove the lowest roll
      newAttributes[attribute] = rolls.reduce((a, b) => a + b, 0);
    });
    setCharacterData({
      ...characterData,
      attributes: newAttributes,
    });
  };
  const [currentDescription, setCurrentDescription] = useState("");

  const alignments: any = [
    "Lawful_good",
    "Neutral_good",
    "Chaotic_good",
    "Lawful_neutral",
    "Chaotic_neutral",
    "True_neutral",
    "Lawful_evil",
    "Chaotic_evil",
    "Neutral_evil",
  ];
  const alignmentDescriptions: any = {
    Lawful_good:
      "Believes in order and doing the right thing, respecting laws and authority.",
    Neutral_good:
      "Does what is good without particular regard for order or chaos.",
    Chaotic_good:
      "Values freedom and kindness, and acts spontaneously, often against tradition or laws.",
    Lawful_neutral:
      "Acts in accordance with law and order, without bias towards good or evil.",
    True_neutral:
      "Acts naturally without prejudice or compulsion, maintaining a balance.",
    Chaotic_neutral:
      " Values personal freedom and choice, avoiding any kind of authority or order.",
    Lawful_evil:
      "Uses structure and laws to pursue selfish goals without regard for others.",
    Neutral_evil:
      "Does whatever it can get away with, without compassion or qualms.",
    Chaotic_evil:
      "Acts on selfish impulses and desires, rejecting order and despising restrictions.",
  };

  const races = [
    "Human",
    "Elf",
    "Half_Elf",
    "Dwarf",
    "Half_Orc",
    "Halfling",
    "Gnome",
    "Dragonborn",
  ];
  const raceDescriptions: any = {
    Human: `Humans are the most adaptable and ambitious people among the common races. They have widely varying tastes, morals, and customs in the many different lands where they have settled. When they settle, though, they stay: they build cities to last for the ages, and great kingdoms that can persist for long centuries. An individual human might have a relatively short life span, but a human nation or culture preserves traditions with origins far beyond the reach of any single human’s memory. They live fully in the present—making them well suited to the adventuring life—but also plan for the future, striving to leave a lasting legacy. Individually and as a group, humans are adaptable opportunists, and they stay alert to changing political and social dynamics.`,
    Elf: `With their unearthly grace and fine features, elves appear hauntingly beautiful to humans and members of many other races. They are slightly shorter than humans on average, ranging from well under 5 feet tall to just over 6 feet. They are more slender than humans, weighing only 100 to 145 pounds. Males and females are about the same height, and males are only marginally heavier than females.

    Elves’ coloration encompasses the normal human range and also includes skin in shades of copper, bronze, and almost bluish-white, hair of green or blue, and eyes like pools of liquid gold or silver. Elves have no facial and little body hair. They favor elegant clothing in bright colors, and they enjoy simple yet lovely jewelry.`,
    Half_Elf: `To humans, half-elves look like elves, and to elves, they look human. In height, they’re on par with both parents, though they’re neither as slender as elves nor as broad as humans. They range from under 5 feet to about 6 feet tall, and from 100 to 180 pounds, with men only slightly taller and heavier than women. Half-elf men do have facial hair, and sometimes grow beards to mask their elven ancestry. Half-elven coloration and features lie somewhere between their human and elf parents, and thus show a variety even more pronounced than that found among either race. They tend to have the eyes of their elven parents.`,
    Dwarf: `Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. Though they stand well under 5 feet tall, dwarves are so broad and compact that they can weigh as much as a human standing nearly two feet taller. Their courage and endurance are also easily a match for any of the larger folk.

      Dwarven skin ranges from deep brown to a paler hue tinged with red, but the most common shades are light brown or deep tan, like certain tones of earth. Their hair, worn long but in simple styles, is usually black, gray, or brown, though paler dwarves often have red hair. Male dwarves value their beards highly and groom them carefully.`,
    Half_Orc: `Half-orcs exhibit a blend of orcish and human characteristics, and their appearance varies widely. Grayish skin tones and prominent teeth are the most common shared elements among these folk.

      Orcs regard battle scars as tokens of pride and ornamental scars as things of beauty. Other scars, though, mark an orc or half-orc as a former prisoner or a disgraced exile. Any half-orc who has lived among or near orcs has scars, whether they are marks of humiliation or of pride, recounting their past exploits and injuries.`,
    Halfling: `Halflings are an affable and cheerful people. They cherish the bonds of family and friendship as well as the comforts of hearth and home, harboring few dreams of gold or glory. Even adventurers among them usually venture into the world for reasons of community, friendship, wanderlust, or curiosity. They love discovering new things, even simple things, such as an exotic food or an unfamiliar style of clothing.

      Halflings are easily moved to pity and hate to see any living thing suffer. They are generous, happily sharing what they have even in lean times.`,
    Gnome: `A gnome’s energy and enthusiasm for living shines through every inch of his or her tiny body. Gnomes average slightly over 3 feet tall and weigh 40 to 45 pounds. Their tan or brown faces are usually adorned with broad smiles (beneath their prodigious noses), and their bright eyes shine with excitement. Their fair hair has a tendency to stick out in every direction, as if expressing the gnome’s insatiable interest in everything around.

  A gnome’s personality is writ large in his or her appearance. A male gnome’s beard, in contrast to his wild hair, is kept carefully trimmed but often styled into curious forks or neat points. A gnome’s clothing, though usually made in modest earth tones, is elaborately decorated with embroidery, embossing, or gleaming jewels.`,
    Dragonborn: `Dragonborn look very much like dragons standing erect in humanoid form, though they lack wings or a tail. The first dragonborn had scales of vibrant hues matching the colors of their dragon kin, but generations of interbreeding have created a more uniform appearance. Their small, fine scales are usually brass or bronze in color, sometimes ranging to scarlet, rust, gold, or copper-green. They are tall and strongly built, often standing close to 6½ feet tall and weighing 300 pounds or more. Their hands and feet are strong, talonlike claws with three fingers and a thumb on each hand.

  The blood of a particular type of dragon runs very strong through some dragonborn clans. These dragonborn often boast scales that more closely match those of their dragon ancestor—bright red, green, blue, or white, lustrous black, or gleaming metallic gold, silver, brass, copper, or bronze.`,
  };

  const classes = [
    "Artificer",
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];
  const classDescriptions: any = {
    Artificer: `Masters of invention, artificers use ingenuity and magic to unlock extraordinary capabilities in objects. They see magic as a complex system waiting to be decoded and then harnessed in their spells and inventions. You can find everything you need to play one of these inventors in the next few sections.

      Artificers use a variety of tools to channel their arcane power. To cast a spell, an artificer might use alchemist's supplies to create a potent elixir, calligrapher's supplies to inscribe a sigil of power, or tinker's tools to craft a temporary charm. The magic of artificers is tied to their tools and their talents, and few other characters can produce the right tool for a job as well as an artificer.`,
    Barbarian: `People of towns and cities take pride in their settled ways, as if denying one’s connection to nature were a mark of superiority. To a barbarian, though, a settled life is no virtue, but a sign of weakness. The strong embrace nature—valuing keen instincts, primal physicality, and ferocious rage. Barbarians are uncomfortable when hedged in by walls and crowds. They thrive in the wilds of their homelands: the tundra, jungle, or grasslands where their tribes live and hunt.

      Barbarians come alive in the chaos of combat. They can enter a berserk state where rage takes over, giving them superhuman strength and resilience. A barbarian can draw on this reservoir of fury only a few times without resting, but those few rages are usually sufficient to defeat whatever threats arise.`,
    Bard: `In the worlds of D&D, words and music are not just vibrations of air, but vocalizations with power all their own. The bard is a master of song, speech, and the magic they contain. Bards say that the multiverse was spoken into existence, that the words of the gods gave it shape, and that echoes of these primordial Words of Creation still resound throughout the cosmos. The music of bards is an attempt to snatch and harness those echoes, subtly woven into their spells and powers.

    The greatest strength of bards is their sheer versatility. Many bards prefer to stick to the sidelines in combat, using their magic to inspire their allies and hinder their foes from a distance. But bards are capable of defending themselves in melee if necessary, using their magic to bolster their swords and armor. Their spells lean toward charms and illusions rather than blatantly destructive spells. They have a wide-ranging knowledge of many subjects and a natural aptitude that lets them do almost anything well. Bards become masters of the talents they set their minds to perfecting, from musical performance to esoteric knowledge.`,
    Cleric: `Divine magic, as the name suggests, is the power of the gods, flowing from them into the world. Clerics are conduits for that power, manifesting it as miraculous effects. The gods don’t grant this power to everyone who seeks it, but only to those chosen to fulfill a high calling.

    Harnessing divine magic doesn’t rely on study or training. A cleric might learn formulaic prayers and ancient rites, but the ability to cast cleric spells relies on devotion and an intuitive sense of a deity’s wishes.
    
    Clerics combine the helpful magic of healing and inspiring their allies with spells that harm and hinder foes. They can provoke awe and dread, lay curses of plague or poison, and even call down flames from heaven to consume their enemies. For those evildoers who will benefit most from a mace to the head, clerics depend on their combat training to let them wade into melee with the power of the gods on their side.`,
    Druid: `Druids revere nature above all, gaining their spells and other magical powers either from the force of nature itself or from a nature deity. Many druids pursue a mystic spirituality of transcendent union with nature rather than devotion to a divine entity, while others serve gods of wild nature, animals, or elemental forces. The ancient druidic traditions are sometimes called the Old Faith, in contrast to the worship of gods in temples and shrines.

      Druid spells are oriented toward nature and animals—the power of tooth and claw, of sun and moon, of fire and storm. Druids also gain the ability to take on animal forms, and some druids make a particular study of this practice, even to the point where they prefer animal form to their natural form.`,
    Fighter: `Fighters learn the basics of all combat styles. Every fighter can swing an axe, fence with a rapier, wield a longsword or a greatsword, use a bow, and even trap foes in a net with some degree of skill. Likewise, a fighter is adept with shields and every form of armor. Beyond that basic degree of familiarity, each fighter specializes in a certain style of combat. Some concentrate on archery, some on fighting with two weapons at once, and some on augmenting their martial skills with magic. This combination of broad general ability and extensive specialization makes fighters superior combatants on battlefields and in dungeons alike.`,
    Monk: `Monks make careful study of a magical energy that most monastic traditions call ki. This energy is an element of the magic that suffuses the multiverse—specifically, the element that flows through living bodies. Monks harness this power within themselves to create magical effects and exceed their bodies’ physical capabilities, and some of their special attacks can hinder the flow of ki in their opponents. Using this energy, monks channel uncanny speed and strength into their unarmed strikes. As they gain experience, their martial training and their mastery of ki gives them more power over their bodies and the bodies of their foes.`,
    Paladin: `A paladin swears to uphold justice and righteousness, to stand with the good things of the world against the encroaching darkness, and to hunt the forces of evil wherever they lurk. Different paladins focus on various aspects of the cause of righteousness, but all are bound by the oaths that grant them power to do their sacred work. Although many paladins are devoted to gods of good, a paladin’s power comes as much from a commitment to justice itself as it does from a god.

     Paladins train for years to learn the skills of combat, mastering a variety of weapons and armor. Even so, their martial skills are secondary to the magical power they wield: power to heal the sick and injured, to smite the wicked and the undead, and to protect the innocent and those who join them in the fight for justice.`,
    Ranger: `Warriors of the wilderness, rangers specialize in hunting the monsters that threaten the edges of civilization—humanoid raiders, rampaging beasts and monstrosities, terrible giants, and deadly dragons. They learn to track their quarry as a predator does, moving stealthily through the wilds and hiding themselves in brush and rubble. Rangers focus their combat training on techniques that are particularly useful against their specific favored foes.

      Thanks to their familiarity with the wilds, rangers acquire the ability to cast spells that harness nature’s power, much as a druid does. Their spells, like their combat abilities, emphasize speed, stealth, and the hunt. A ranger’s talents and abilities are honed with deadly focus on the grim task of protecting the borderlands.`,
    Rogue: `Rogues devote as much effort to mastering the use of a variety of skills as they do to perfecting their combat abilities, giving them a broad expertise that few other characters can match. Many rogues focus on stealth and deception, while others refine the skills that help them in a dungeon environment, such as climbing, finding and disarming traps, and opening locks.

     When it comes to combat, rogues prioritize cunning over brute strength. A rogue would rather make one precise strike, placing it exactly where the attack will hurt the target most, than wear an opponent down with a barrage of attacks. Rogues have an almost supernatural knack for avoiding danger, and a few learn magical tricks to supplement their other abilities.`,
    Sorcerer: `Magic is a part of every sorcerer, suffusing body, mind, and spirit with a latent power that waits to be tapped. Some sorcerers wield magic that springs from an ancient bloodline infused with the magic of dragons. Others carry a raw, uncontrolled magic within them, a chaotic storm that manifests in unexpected ways.

      The appearance of sorcerous powers is wildly unpredictable. Some draconic bloodlines produce exactly one sorcerer in every generation, but in other lines of descent every individual is a sorcerer. Most of the time, the talents of sorcery appear as apparent flukes. Some sorcerers can’t name the origin of their power, while others trace it to strange events in their own lives. The touch of a demon, the blessing of a dryad at a baby’s birth, or a taste of the water from a mysterious spring might spark the gift of sorcery. So too might the gift of a deity of magic, exposure to the elemental forces of the Inner Planes or the maddening chaos of Limbo, or a glimpse into the inner workings of reality.
      
      Sorcerers have no use for the spellbooks and ancient tomes of magic lore that wizards rely on, nor do they rely on a patron to grant their spells as warlocks do. By learning to harness and channel their own inborn magic, they can discover new and staggering ways to unleash that power.`,
    Warlock: `A warlock is defined by a pact with an otherworldly being. Sometimes the relationship between warlock and patron is like that of a cleric and a deity, though the beings that serve as patrons for warlocks are not gods. A warlock might lead a cult dedicated to a demon prince, an archdevil, or an utterly alien entity—beings not typically served by clerics. More often, though, the arrangement is similar to that between a master and an apprentice. The warlock learns and grows in power, at the cost of occasional services performed on the patron’s behalf.

     The magic bestowed on a warlock ranges from minor but lasting alterations to the warlock’s being (such as the ability to see in darkness or to read any language) to access to powerful spells. Unlike bookish wizards, warlocks supplement their magic with some facility at hand-to-hand combat. They are comfortable in light armor and know how to use simple weapons.`,
    Wizard: `Wild and enigmatic, varied in form and function, the power of magic draws students who seek to master its mysteries. Some aspire to become like the gods, shaping reality itself. Though the casting of a typical spell requires merely the utterance of a few strange words, fleeting gestures, and sometimes a pinch or clump of exotic materials, these surface components barely hint at the expertise attained after years of apprenticeship and countless hours of study.

     Wizards live and die by their spells. Everything else is secondary. They learn new spells as they experiment and grow in experience. They can also learn them from other wizards, from ancient tomes or inscriptions, and from ancient creatures (such as the fey) that are steeped in magic.`,
  };

  const backgroundDescriptions: any = {
    Acolyte:
      "An acolyte has spent their life in the service of a temple to a specific god or pantheon of gods. They are well-versed in religious knowledge and rituals.",
    Charlatan:
      "A charlatan has a talent for deception. They are skilled in trickery and duplicity, often using disguises and forged documents.",
    Criminal:
      "A criminal has a history in breaking the law. They are experienced in stealth, evasion, and the underworld.",
    Entertainer:
      "An entertainer thrives in performing for others. They are skilled in a variety of arts such as music, dance, and comedy.",
    Folk_hero:
      "A folk hero is a champion of the common people, having performed a great deed or risen from humble beginnings.",
    Guild_artisan:
      "A guild artisan is a member of a trade guild. They are skilled in a specific craft and are familiar with the business aspects of their trade.",
    Hermit:
      "A hermit has lived in seclusion for a significant period. They might have been seeking knowledge, spiritual enlightenment, or hiding from society.",
    Noble:
      "A noble comes from a privileged background. They are accustomed to wealth and influence and are often well-educated.",
    Outlander:
      "An outlander has grown up in the wilds, far from civilization. They are familiar with natural landscapes and survival techniques.",
    Sage: "A sage is devoted to knowledge and research. They might be a scholar, a researcher, or an adviser, with extensive learning in particular fields.",
    Sailor:
      "A sailor has spent a considerable amount of time on ships and at sea. They are familiar with navigation and life aboard a ship.",
    Soldier:
      "A soldier has experienced the discipline and rigor of military life. They are accustomed to combat and have likely participated in a war or conflict.",
    Urchin:
      "An urchin grew up on the streets, alone and impoverished. They have developed the skills to survive in a harsh urban environment.",
  };
  const backgrounds = Object.keys(backgroundDescriptions);
  const getDescription = (s: number) => {
    switch (s) {
      case 0:
        return raceDescriptions[characterData.race];
        break;
      case 1:
        return classDescriptions[characterData.class];
        break;
      case 2:
        return alignmentDescriptions[characterData.alignment];
        break;
      case 3:
        return attributeDescriptions["Strength"];
        break;
      case 4:
        return backgroundDescriptions[characterData.background];
        break;
    }
  };
  const handleSelection = (key, value) => {
    setCharacterData({ ...characterData, [key]: value });
    let description;
    switch (key) {
      case "race":
        description = raceDescriptions[value];

        break;
      case "class":
        description = classDescriptions[value];
        break;
      case "alignment":
        description = alignmentDescriptions[value.replace(/\s/g, "_")];
        break;
      case "background":
        description = backgroundDescriptions[value];
        break;
    }

    setCurrentDescription(description);
  };
  const steps = [
    { title: "Race", description: "" },
    { title: "Class", description: "" },
    { title: "Alignment", description: "" },
    { title: "Ability scores", description: "" },
    { title: "Background", description: "" },
    { title: "Character Sheet", description: "" },
  ];
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setCurrentDescription("");
    }
  };

  const handleForward = () => {
    if (step < 5) {
      setStep(step + 1);
      setCurrentDescription("");
    }
  };
  useEffect(() => {
    setCurrentDescription(getDescription(step));
    console.log("Setting descr", getDescription(step));
  }, [step]);
  const renderDialogBox = () => {
    switch (step) {
      case 0:
        return (
          <Flex
            width={"100%"}
            paddingTop={"5%"}
            justifyContent={"space-around"}
          >
            {" "}
            <Box width={"25%"} maxHeight={"80%"} overflow={"auto"}>
              <Flex width={"10rem"} direction={"column"}>
                {races.map((race) => (
                  <Tag
                    key={race}
                    color={characterData.race === race ? "black" : "#ddddddd"}
                    background={
                      characterData.race === race ? "orange" : "black"
                    }
                    height={"2rem"}
                    width={"100%"}
                    zIndex={"20"}
                    border={"1px solid #dddddd"}
                    _hover={{ background: "orange", cursor: "crosshair" }}
                    onClick={() => handleSelection("race", race)}
                  >
                    {race}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
            >
              {characterData.race && (
                <Image src={`/races/${characterData.race}.jpg`} />
              )}
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              padding={"1%"}
            >
              <Text>{currentDescription}</Text>
            </Box>
          </Flex>
        );
      case 1:
        return (
          <Flex
            width={"100%"}
            paddingTop={"5%"}
            justifyContent={"space-around"}
          >
            {" "}
            <Box width={"25%"} maxHeight={"80%"} overflow={"auto"}>
              <Flex width={"10rem"} direction={"column"}>
                {classes.map((cls) => (
                  <Tag
                    key={cls}
                    color={"#dddddd"}
                    background={"black"}
                    height={"2rem"}
                    zIndex={"20"}
                    width={"100%"}
                    border={"1px solid #dddddd"}
                    _hover={{ background: "orange", cursor: "crosshair" }}
                    onClick={() => handleSelection("class", cls)}
                  >
                    {cls}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
            >
              {characterData.class && (
                <Image src={`/classes/${characterData.class}.jpg`} />
              )}
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              padding={"1%"}
            >
              <Text>{currentDescription}</Text>
            </Box>
          </Flex>
        );
      case 2:
        return (
          <Flex
            width={"100%"}
            paddingTop={"5%"}
            justifyContent={"space-around"}
          >
            {" "}
            <Box width={"25%"} maxHeight={"80%"} overflow={"auto"}>
              <Flex width={"10rem"} direction={"column"}>
                {alignments.map((cls) => (
                  <Tag
                    key={cls}
                    color={"#dddddd"}
                    background={"black"}
                    height={"2rem"}
                    zIndex={"20"}
                    width={"100%"}
                    border={"1px solid #dddddd"}
                    _hover={{ background: "orange", cursor: "crosshair" }}
                    onClick={() => handleSelection("alignment", cls)}
                  >
                    {cls}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              background={"black"}
            >
              {characterData.alignment && (
                <Image src={`/alignments/${characterData.alignment}.jpeg`} />
              )}
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              padding={"1%"}
            >
              <Text>{currentDescription}</Text>
            </Box>
          </Flex>
        );
      case 3:
        return (
          <Flex
            width={"100%"}
            justifyContent={"space-around"}
            paddingTop={"2%"}
          >
            <Flex
              width={"25%"}
              direction={"column"}
              align="center"
              justify="flex-start"
            >
              <Flex
                direction={"column"}
                border={"1px solid #dddddd"}
                padding={"5%"}
              >
                {Object.keys(characterData.attributes).map((attribute) => (
                  <Flex key={attribute} mb={2} justifyContent={"space-between"}>
                    <Text
                      width={"30%"}
                      mr={2}
                      cursor={"pointer"}
                      border={
                        currentDescription === attributeDescriptions[attribute]
                          ? "1px solid #dddddd"
                          : ""
                      }
                      onClick={() =>
                        setCurrentDescription(
                          () => attributeDescriptions[attribute]
                        )
                      }
                    >
                      {attribute}:
                    </Text>
                    <Input
                      width={"20%"}
                      type="number"
                      value={characterData.attributes[attribute]}
                      onChange={(e) =>
                        handleAttributeChange(
                          attribute,
                          parseInt(e.target.value)
                        )
                      }
                    />{" "}
                    <Text width={"30%"} mr={2}>
                      {calculateModifier(characterData.attributes[attribute])}:
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Button mt={4} onClick={rollForAttributes} colorScheme="black">
                Roll for Attributes
              </Button>
            </Flex>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              background={"black"}
            >
              {characterData.attributes && (
                <Image
                  src={`/attributes/${Object.keys(attributeDescriptions).find(
                    (key) => attributeDescriptions[key] === currentDescription
                  )}.jpg`}
                />
              )}
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              padding={"1%"}
            >
              <Text>{currentDescription}</Text>
            </Box>
          </Flex>
        );
      case 4:
        return (
          <Flex
            width={"100%"}
            paddingTop={"5%"}
            justifyContent={"space-around"}
          >
            {" "}
            <Box width={"25%"} maxHeight={"80%"} overflow={"auto"}>
              <Flex width={"10rem"} direction={"column"}>
                {backgrounds.map((cls) => (
                  <Tag
                    key={cls}
                    zIndex={"20"}
                    color={"#dddddd"}
                    background={"black"}
                    height={"2rem"}
                    width={"100%"}
                    border={"1px solid #dddddd"}
                    _hover={{ background: "orange", cursor: "crosshair" }}
                    onClick={() => handleSelection("background", cls)}
                  >
                    {cls}
                  </Tag>
                ))}
              </Flex>
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              background={"black"}
            >
              {characterData.background && (
                <Image src={`/backgrounds/${characterData.background}.jpg`} />
              )}
            </Box>
            <Box
              width={"25%"}
              border={"1px solid #dddddd"}
              height={"fit-content"}
              padding={"1%"}
            >
              <Text>{currentDescription}</Text>
            </Box>
          </Flex>
        );
      default:
        return (
          <Box
            borderRadius={".5rem"}
            border={"solid 2px #dddddd"}
            color="black"
            overflow={"auto"}
            height={"100%"}
            opacity={".85"}
          >
            <CharacterSheet characterData={characterData} />
          </Box>
        );
    }
  };

  return (
    <Box
      background={"rgba(0,0,0,0.75)"}
      border={"1px #dddddd solid"}
      padding={"1rem"}
      color={"#dddddd"}
      width={"100%"}
    >
      {" "}
      <Stepper index={step} colorScheme="orange">
        {steps.map((step, index) => (
          <Step
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => setStep(() => index)}
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Flex
        height={"fit-content"}
        minHeight={"100vh"}
        padding={"1% 0 0 0"}
        justifyContent={"center"}
      >
        {renderDialogBox()}
      </Flex>
      <Flex position={"absolute"} zIndex={"25"} right={"1%"} top={"1%"}>
        <Button onClick={handleBack} background={"black"} color={"#dddddd"}>
          Back
        </Button>{" "}
        <Button onClick={handleForward} background={"black"} color={"#dddddd"}>
          Next
        </Button>
        <Button onClick={handleForward} background={"black"} color={"#dddddd"}>
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default CharacterCreation;
