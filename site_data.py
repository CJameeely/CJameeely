from __future__ import annotations

SITE_META = {
    "title": "CJ Li | Artist Portfolio",
    "description": "A focused portfolio for artist CJ Li's MA Drawing research, reflections, and works across Units 1-3.",
    "author": "CJ Li",
}

NAV_STRUCTURE = [
    {
        "label": "Unit 1",
        "href": "about-3.html",
        "slug": "about-3",
        "items": [
            {"label": "Artist statement", "href": "about.html", "slug": "about"},
            {"label": "Critical reflection", "href": "critical-reflection.html", "slug": "critical-reflection"},
            {"label": "Contexts", "href": "contexts.html", "slug": "contexts"},
            {"label": "Work and process", "href": "work-and-process.html", "slug": "work-and-process"},
        ],
    },
    {
        "label": "Unit 2",
        "href": "about-3-1.html",
        "slug": "about-3-1",
        "items": [
            {"label": "crirical reflection", "href": "crirical-reflection.html", "slug": "crirical-reflection"},
            {"label": "Professional Skills", "href": "professional-skills.html", "slug": "professional-skills"},
            {"label": "Contexts", "href": "contexts-1.html", "slug": "contexts-1"},
            {"label": "proposal", "href": "proposal.html", "slug": "proposal"},
            {"label": "Statement", "href": "statement.html", "slug": "statement"},
            {"label": "Work and process", "href": "document-your-current-art-practice.html", "slug": "document-your-current-art-practice"},
        ],
    },
    {
        "label": "Unit 3",
        "href": "about-3-2.html",
        "slug": "about-3-2",
        "items": [
            {"label": "artist statement", "href": "critical-reflection-1.html", "slug": "critical-reflection-1"},
            {"label": "Research Festival", "href": "rf.html", "slug": "rf"},
            {"label": "critical reflection", "href": "critical.html", "slug": "critical"},
            {"label": "Works and Processes", "href": "works-and-processes.html", "slug": "works-and-processes"},
            {"label": "Contexts", "href": "contexts-2.html", "slug": "contexts-2"},
        ],
    },
]

PAGES = [
    {
        "slug": "index",
        "filename": "index.html",
        "title": "CJ Li | Artist Portfolio",
        "description": SITE_META["description"],
        "hero": {
            "kicker": "Portfolio",
            "title": "CJ LI",
            "subtitle": "MA Drawing",
            "align": "center",
        },
        "sections": [
            {
                "kind": "text",
                "style": "intro",
                "paragraphs": [
                    "CJ Li is a London-based artist whose drawings translate tidal memories into architectural gestures.",
                    "This site mirrors the structure of the MA research units and gathers writing, process notes, and documentation in one clear frame.",
                ],
            }
        ],
    },
    {
        "slug": "about-3",
        "filename": "about-3.html",
        "title": "Unit 1 | CJ Li",
        "description": "Unit 1 overview for CJ Li's MA Drawing journey.",
        "hero": {
            "kicker": "Unit 1",
            "title": "Foundation",
            "subtitle": "Mapping the first term outcomes",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "title": "Unit 1 deliverables",
                "layout": "cards",
                "items": [
                    {"label": "Artist Statement", "description": "Positioning memory as a spatial material."},
                    {"label": "Critical Reflection", "description": "Frameworks for translating touch into mark."},
                    {"label": "Works & Processes", "description": "Key drawings made between October and December."},
                    {"label": "Contexts", "description": "Workshops, lectures, and references that shaped the studio."},
                ],
            }
        ],
    },
    {
        "slug": "about",
        "filename": "about.html",
        "title": "Artist Statement | CJ Li",
        "description": "CJ Li's Unit 1 artist statement.",
        "hero": {
            "kicker": "Unit 1",
            "title": "Artist Statement",
            "subtitle": "Drawing as a container for shoreline memory",
            "align": "left",
        },
        "sections": [
            {
                "kind": "text",
                "paragraphs": [
                    "Raised beside a working harbor, I learned to read tides before I learned to read words. Drawing became the only way to map how water leaves and returns, carving temporary rooms inside my memory. Each graphite layer acts like scaffolding, supporting fragile recollections of fog, rope, and wind-battered steel.",
                    "Architecture runs through my family, so I borrow plan-view thinking to choreograph the page. Paper turns into a site where shadow, salt, and sound overlap. I am less interested in illustrating places than in building vessels that might hold unstable emotion.",
                    "Recent work slows the viewer down with porous grids, faint washes, and deliberate gaps. Those pauses are invitations to complete the space with their own memory, letting the drawing shift from a document into a shared experience.",
                ],
            }
        ],
    },
    {
        "slug": "critical-reflection",
        "filename": "critical-reflection.html",
        "title": "Critical Reflection | Unit 1",
        "description": "Key lines of inquiry for Unit 1.",
        "hero": {
            "kicker": "Unit 1",
            "title": "Critical Reflection",
            "subtitle": "Anchor points for the first term",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "ordered": True,
                "items": [
                    {"label": "Memory", "description": "How far can a drawing stretch before the memory it holds evaporates?"},
                    {"label": "Water / Climate", "description": "Tracing rising tides without turning the work into illustration."},
                    {"label": "Space / Touch", "description": "Letting haptic mark-making propose new interior landscapes."},
                ],
            }
        ],
    },
    {
        "slug": "contexts",
        "filename": "contexts.html",
        "title": "Contexts | Unit 1",
        "description": "Workshops and references for Unit 1.",
        "hero": {
            "kicker": "Unit 1",
            "title": "Contexts",
            "subtitle": "External inputs and research",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "layout": "timeline",
                "items": [
                    {"label": "24 Oct 2024", "description": "Workshop with visiting artist Helen Maurer on optical layering."},
                    {"label": "10 Oct 2024", "description": "Tracey Emin at White Cube: studying endurance in line."},
                    {"label": "02 Oct 2024", "description": "Lecture by Frank Bowling on color as topography."},
                ],
            }
        ],
    },
    {
        "slug": "work-and-process",
        "filename": "work-and-process.html",
        "title": "Works and Processes | Unit 1",
        "description": "Key works from Unit 1.",
        "hero": {
            "kicker": "Unit 1",
            "title": "Works and Processes",
            "subtitle": "Selected drawings",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "layout": "cards",
                "items": [
                    {"label": "Fallen", "description": "Graphite and chalk study of collapsing scaffolds."},
                    {"label": "That Day We Ran By the Water", "description": "Sequential drawing that follows a shoreline sprint."},
                    {"label": "Waves", "description": "Monoprints layered with hand-cut stencils."},
                    {"label": "Sketch", "description": "Notebook excerpts showing mark-testing."},
                ],
            }
        ],
    },
    {
        "slug": "about-3-1",
        "filename": "about-3-1.html",
        "title": "Unit 2 | CJ Li",
        "description": "Unit 2 overview.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Expansion",
            "subtitle": "Deepening method and production",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "title": "Unit 2 checkpoints",
                "layout": "cards",
                "items": [
                    {"label": "Statement", "description": "Refining the voice of the project."},
                    {"label": "Work and Process", "description": "Iterative studio trials with scale and light."},
                    {"label": "Critical Reflection", "description": "Testing whether incompleteness can be a method."},
                    {"label": "Contexts", "description": "Reading groups and site visits."},
                    {"label": "Professional Skills", "description": "Installing, budgeting, and collaboration."},
                    {"label": "Proposal for Unit 3", "description": "Draft plan for the final presentation."},
                ],
            }
        ],
    },
    {
        "slug": "crirical-reflection",
        "filename": "crirical-reflection.html",
        "title": "Critical Reflection | Unit 2",
        "description": "Process reflection for Unit 2.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Critical Reflection",
            "subtitle": "Breaking, reorganizing, reinterpreting",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "ordered": True,
                "items": [
                    {"label": "Breaking apart", "description": "Distilling dense drawings into modular fragments."},
                    {"label": "Reorganizing", "description": "Pinning fragments across walls to test rhythm."},
                    {"label": "Reinterpreting", "description": "Projecting shadows back onto paper to create new scores."},
                ],
            }
        ],
    },
    {
        "slug": "professional-skills",
        "filename": "professional-skills.html",
        "title": "Professional Skills | Unit 2",
        "description": "Expanded professional toolkit.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Professional Skills",
            "subtitle": "Practical capacities behind the work",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "layout": "cards",
                "items": [
                    {"label": "Installation planning", "description": "Digital mockups, scaled drawings, and health and safety paperwork."},
                    {"label": "Collaboration", "description": "Working with sound designers and technicians on multi-sensory elements."},
                    {"label": "Public engagement", "description": "Writing accessible wall texts and facilitating crit-style walkthroughs."},
                    {"label": "Documentation", "description": "High resolution capture, captioning, and archiving for funding use."},
                ],
            }
        ],
    },
    {
        "slug": "contexts-1",
        "filename": "contexts-1.html",
        "title": "Contexts | Unit 2",
        "description": "References feeding Unit 2.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Contexts",
            "subtitle": "Reading and viewing log",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "items": [
                    {"label": "Reading: The Poetics of Space", "description": "Bachelard's writing on intimacy informs the notion of pocket architecture."},
                    {"label": "Essay response: The Burnout Society", "description": "Notes on fatigue cultures as invisible architecture."},
                    {"label": "Viewing: Do Ho Suh at Tate Modern", "description": "Studying translucent replicas as memory containers."},
                ],
            }
        ],
    },
    {
        "slug": "proposal",
        "filename": "proposal.html",
        "title": "Proposal | Unit 2",
        "description": "Installation proposal for Unit 3.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Proposal",
            "subtitle": "Sketch for the Unit 3 presentation",
            "align": "left",
        },
        "sections": [
            {
                "kind": "text",
                "paragraphs": [
                    "The proposed installation occupies the corner of the gallery with a timber frame that leans away from the wall, creating a narrow corridor for viewers. Small drawings float within the frame on tracing paper, while a looped video glows at ankle height. A sewn fabric figure anchors the floor, referencing the scale of a body.",
                    "Light will be carefully bounced so shadows of the drawings fall across the walls, letting absence perform alongside the marks. The goal is to choreograph movement: crouch to read, step back to see the constellation, then exit carrying a shifted sense of scale.",
                ],
            }
        ],
    },
    {
        "slug": "statement",
        "filename": "statement.html",
        "title": "Statement | Unit 2",
        "description": "Unit 2 artist statement for CJ Li.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Statement",
            "subtitle": "Fragments, gaps, and provisional space",
            "align": "left",
        },
        "sections": [
            {
                "kind": "text",
                "paragraphs": [
                    "I treat drawing as slow choreography. Rather than chase a definitive image, I gather fragments: lint from vacuums, rubbings of rusty hinges, lists scribbled during bus rides. These pieces are edited like film, cut apart and reassembled until a new interior reveals itself.",
                    "The work resists linear narrative. Viewers encounter suspended sheets, graphite stains, and blank distances that invite pause. Each gap is deliberate, a breathing pocket where another story might take root.",
                    "As the project evolves, I am learning to let incompleteness stay visible. The seams and taped edges keep the drawings honest, reminding me that memory is always under construction.",
                ],
            }
        ],
    },
    {
        "slug": "document-your-current-art-practice",
        "filename": "document-your-current-art-practice.html",
        "title": "Work and Process | Unit 2",
        "description": "Documentation of current art practice.",
        "hero": {
            "kicker": "Unit 2",
            "title": "Work and Process",
            "subtitle": "Current studio strands",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "layout": "cards",
                "items": [
                    {"label": "Container", "description": "Modular plywood frame holding suspended vellum drawings."},
                    {"label": "The Faintest Sign", "description": "Series of erasure drawings that dissolve as you walk past."},
                    {"label": "Those Days", "description": "Accordion book collecting shoreline observations in ink."},
                ],
            }
        ],
    },
    {
        "slug": "about-3-2",
        "filename": "about-3-2.html",
        "title": "Unit 3 | CJ Li",
        "description": "Unit 3 overview.",
        "hero": {
            "kicker": "Unit 3",
            "title": "Resolution",
            "subtitle": "Research threads converging",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "layout": "cards",
                "items": [
                    {"label": "Artist Statement", "description": "Incompleteness as a deliberate stance."},
                    {"label": "Works and Processes", "description": "Final installation components."},
                    {"label": "Critical Reflection", "description": "Evaluating what remains unsolved."},
                    {"label": "Research Festival", "description": "Memoir zine and presentation."},
                    {"label": "Contexts", "description": "Peer shows and external references."},
                ],
            }
        ],
    },
    {
        "slug": "critical-reflection-1",
        "filename": "critical-reflection-1.html",
        "title": "Artist Statement | Unit 3",
        "description": "Unit 3 artist statement.",
        "hero": {
            "kicker": "Unit 3",
            "title": "Artist Statement",
            "subtitle": "Working through incompleteness",
            "align": "left",
        },
        "sections": [
            {
                "kind": "text",
                "paragraphs": [
                    "Throughout Unit 3 I questioned the assumption that memories can be neatly reconstructed. I began removing sections of drawings, allowing bleach and sandpaper to erase lines I had labored over. The residue left behind felt more honest than the completed image.",
                    "Materials now oscillate between presence and disappearance: dusty charcoal held beside translucent fabric, video projections that dissolve when someone steps too close. I want the work to hover, always on the edge of becoming.",
                    "By foregrounding incompleteness, I hand agency to the viewer. They decide how to navigate the missing pieces, making their own bridges across the gaps.",
                ],
            }
        ],
    },
    {
        "slug": "rf",
        "filename": "rf.html",
        "title": "Research Festival | CJ Li",
        "description": "Memoir zine for the research festival.",
        "hero": {
            "kicker": "Unit 3",
            "title": "Research Festival",
            "subtitle": "Memoir zine",
            "align": "left",
        },
        "sections": [
            {
                "kind": "text",
                "paragraphs": [
                    "For the Research Festival I produced a hand-stitched zine titled \"Memoir\" (15 x 20 cm). The pages are a mix of cotton rag paper, fabric swatches, and typewritten excerpts from my ongoing research into domestic space.",
                    "Every spread pairs a drawing with annotations from Gaston Bachelard's \"The Poetics of Space\". Viewers are invited to handle the book, trace the pencil grooves, and read intimate notes about remembering. The zine doubles as both artwork and research log.",
                ],
            }
        ],
    },
    {
        "slug": "critical",
        "filename": "critical.html",
        "title": "Critical Reflection Essay | CJ Li",
        "description": "Extended writing on incompleteness as method.",
        "hero": {
            "kicker": "Unit 3",
            "title": "Critical Reflection",
            "subtitle": "Incompleteness as method",
            "align": "left",
        },
        "sections": [
            {
                "kind": "text",
                "title": "Preface",
                "paragraphs": [
                    "This essay maps how incompleteness shifted from an accident in my drawings to a central methodology. It documents questions raised in tutorials, external readings, and experiments executed in the studio.",
                ],
            },
            {
                "kind": "text",
                "title": "I. Presence and Absence",
                "paragraphs": [
                    "Leaving parts of a drawing unfinished changes how the body navigates the work. The missing sections pull focus toward the periphery, reminding viewers that every mark implies a counterpart that is not present.",
                ],
            },
            {
                "kind": "text",
                "title": "II. Within and Beyond the Frame",
                "paragraphs": [
                    "I experimented with overlapping frames, installing paper outside the expected borders. The gesture unsettles the picture plane and hints that memory spills further than the documented area.",
                ],
            },
            {
                "kind": "text",
                "title": "III. Circulation of Power",
                "paragraphs": [
                    "When the work withholds information, viewers become active negotiators. They decide what might sit inside the blank sections. This redistribution of authorship is crucial to how I now read my own practice.",
                ],
            },
            {
                "kind": "text",
                "title": "IV. Repositioning the Practice",
                "paragraphs": [
                    "Unit 3 solidified an expanded field for drawing: part installation, part choreography. Incompleteness is no longer a flaw but a strategy that keeps the work open, generous, and alive to change.",
                ],
            },
        ],
    },
    {
        "slug": "works-and-processes",
        "filename": "works-and-processes.html",
        "title": "Works and Processes | Unit 3",
        "description": "Final works for Unit 3.",
        "hero": {
            "kicker": "Unit 3",
            "title": "Works and Processes",
            "subtitle": "Installation components",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "layout": "cards",
                "items": [
                    {"label": "What If It Was", "description": "Lightbox drawing that fades in response to proximity."},
                    {"label": "Processes", "description": "Large wall score built from layered acetate."},
                    {"label": "Over There", "description": "Sound-assisted drawing installed across a corner."},
                ],
            }
        ],
    },
    {
        "slug": "contexts-2",
        "filename": "contexts-2.html",
        "title": "Contexts | Unit 3",
        "description": "Final unit contexts.",
        "hero": {
            "kicker": "Unit 3",
            "title": "Contexts",
            "subtitle": "Community and references",
            "align": "left",
        },
        "sections": [
            {
                "kind": "list",
                "items": [
                    {"label": "Reading: Discipline and Punish", "description": "Considering surveillance and power lines within spatial practice."},
                    {"label": "Visit: Slade MA Show", "description": "Benchmarking installation strategies."},
                    {"label": "Exhibition: Noah Davis at Barbican", "description": "Studying how narrative painting holds silence."},
                    {"label": "Pop-up: MA Drawing collective show", "description": "Testing layout and public engagement."},
                ],
            }
        ],
    },
]
