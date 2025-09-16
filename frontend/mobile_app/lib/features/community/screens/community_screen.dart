import 'package:flutter/material.dart';

class CommunityScreen extends StatefulWidget {
  const CommunityScreen({super.key});

  @override
  State<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends State<CommunityScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFE6F3FF),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _Header(onPost: () {}),
              const SizedBox(height: 14),
              _StatsRow(),
              const SizedBox(height: 12),
              _SearchBar(controller: _searchController),
              const SizedBox(height: 12),
              _FilterRow(),
              const SizedBox(height: 8),
              _SegmentedTabs(),
              const SizedBox(height: 12),
              _TrendingSection(),
              const SizedBox(height: 12),
              const _PostCard(
                authorInitials: 'SC',
                authorName: 'Sarah Bhatt',
                authorRole: 'Local Surfer',
                categoryChip: _CategoryChip(
                    label: 'Safety Alerts',
                    color: Color.fromARGB(255, 156, 40, 40)),
                highlightColor: Color(0xFFFFE4E6),
                labels: [
                  _MiniLabel(text: 'Alert', color: Color(0xFFFF5C5C)),
                ],
                timeAgo: '2 hours ago',
                location: 'Sunset Beach',
                title:
                    'Strong Rip Currents at Sunset Beach - Safety Tips Needed',
                excerpt:
                    'Has anyone noticed the increased rip current activity at Sunset Beach this week? I was out surfing yesterday and the currents were much stronger than usual. Looking for local insights and safety recommendations.',
                tags: ['rip-currents', 'surfing', 'safety'],
                upvotes: 12,
                comments: 8,
                views: 156,
                isHighlighted: true,
              ),
              const SizedBox(height: 12),
              const _PostCard(
                authorInitials: 'MR',
                authorName: 'Mohit Singh',
                authorRole: 'Dive Master',
                categoryChip:
                    _CategoryChip(label: 'Diving', color: Color(0xFF71E0B2)),
                labels: [],
                timeAgo: '4 hours ago',
                location: 'Odisha Coast',
                title: 'Best Diving Spots This Weekend?',
                excerpt:
                    'Planning a diving trip this weekend. Weather looks good but want to check with the community about current conditions and visibility.',
                tags: ['diving', 'weekend', 'conditions'],
                upvotes: 31,
                comments: 22,
                views: 312,
                isHighlighted: true,
              ),
              const SizedBox(height: 12),
              const _PostCard(
                authorInitials: 'OWT',
                authorName: 'Ocean Watch Team',
                authorRole: 'Official',
                categoryChip: _CategoryChip(
                    label: 'Hazard Alerts', color: Color(0xFFFFC46B)),
                highlightColor: Color(0xFFFFF7EB),
                labels: [
                  _MiniLabel(text: 'Alert', color: Color(0xFFFF5C5C)),
                ],
                timeAgo: '6 hours ago',
                location: 'North Bay',
                title: 'Jellyfish Bloom Alert - North Bay Area',
                excerpt:
                    'Large jellyfish bloom spotted in North Bay. Multiple stings reported. Swimmers and surfers should exercise extreme caution.',
                tags: ['marine-debris', 'cleanup', 'environment'],
                upvotes: 24,
                comments: 12,
                views: 487,
                isHighlighted: true,
              ),
              const SizedBox(height: 12),
              Center(
                child: TextButton(
                  style: TextButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: const Color(0xFF2563EB),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 20, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: const BorderSide(color: Color(0xFFE2E8F0)),
                    ),
                  ),
                  onPressed: () {},
                  child: const Text('Load More Posts'),
                ),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  final VoidCallback onPost;
  const _Header({required this.onPost});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Expanded(
          child: Padding(
            padding: EdgeInsets.only(right: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Community Forum',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF0F172A),
                  ),
                ),
                SizedBox(height: 8),
                Text(
                  'Connect, share experiences, stay safe',
                  style: TextStyle(
                    fontSize: 16,
                    color: Color(0xFF64748B),
                  ),
                ),
                SizedBox(height: 2),
              ],
            ),
          ),
        ),
        TextButton.icon(
          style: TextButton.styleFrom(
            backgroundColor: const Color(0xFF2563EB),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          ),
          onPressed: onPost,
          icon: const Icon(Icons.add, size: 18),
          label: const Text('Post'),
        )
      ],
    );
  }
}

class _StatsRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        Expanded(child: _StatCard(title: 'Members', value: '2.8K')),
        SizedBox(width: 14),
        Expanded(child: _StatCard(title: 'Posts', value: '1.2K')),
        SizedBox(width: 14),
        Expanded(
            child: _StatCard(
                title: 'Reports', value: '89', accent: Color(0xFFFF6B6B))),
        SizedBox(width: 14),
        Expanded(
            child: _StatCard(
                title: 'This Week', value: '+127', accent: Color(0xFF10B981))),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final Color accent;
  const _StatCard(
      {required this.title,
      required this.value,
      this.accent = const Color(0xFF2563EB)});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 18),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF3FAFF), Color(0xFFF2FFF8)],
        ),
        borderRadius: BorderRadius.circular(12),
        boxShadow: const [
          BoxShadow(
              color: Color(0x12000000), blurRadius: 12, offset: Offset(0, 6))
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(value,
              style: TextStyle(
                  color: accent, fontSize: 18, fontWeight: FontWeight.w800)),
          const SizedBox(height: 6),
          Text(title,
              style: const TextStyle(color: Color(0xFF64748B), fontSize: 12)),
        ],
      ),
    );
  }
}

class _SearchBar extends StatelessWidget {
  final TextEditingController controller;
  const _SearchBar({required this.controller});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      decoration: InputDecoration(
        hintText: 'Search discussions, hazards... ',
        prefixIcon: const Icon(Icons.search),
        filled: true,
        fillColor: Colors.white,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFF93C5FD)),
        ),
      ),
    );
  }
}

class _FilterRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return const Wrap(
      spacing: 10,
      runSpacing: 10,
      children: [
        _FilterChip(
          label: 'All',
          selected: true,
        ),
        _FilterChip(
          label: 'Safety Alerts',
          badge: '12',
          borderColor: Color(0xFFE2E8F0),
          color: Colors.white,
          textColor: Color(0xFF1F2937),
          badgeBgColor: Color(0xFFFFE4E6),
          badgeTextColor: Color(0xFFDC2626),
        ),
        _FilterChip(
          label: 'Hazard Alerts',
          badge: '8',
          borderColor: Color(0xFFE2E8F0),
          color: Colors.white,
          textColor: Color(0xFF1F2937),
          badgeBgColor: Color(0xFFFFF1E6),
          badgeTextColor: Color(0xFFEA580C),
        ),
        _FilterChip(
          label: 'Surfing',
          badge: '34',
          borderColor: Color(0xFFE2E8F0),
          color: Colors.white,
          textColor: Color(0xFF1F2937),
          badgeBgColor: Color(0xFFEFF6FF),
          badgeTextColor: Color(0xFF2563EB),
        ),
        _FilterChip(
          label: '+3 more',
          borderColor: Color(0xFFE2E8F0),
          color: Colors.white,
          textColor: Color(0xFF1F2937),
        ),
      ],
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final String? badge;
  final bool selected;
  final Color? color;
  final Color? textColor;
  final Color? borderColor;
  final Color? badgeBgColor;
  final Color? badgeTextColor;
  const _FilterChip({
    required this.label,
    this.badge,
    this.selected = false,
    this.color,
    this.textColor,
    this.borderColor,
    this.badgeBgColor,
    this.badgeTextColor,
  });

  @override
  Widget build(BuildContext context) {
    final bg = selected ? const Color(0xFF2563EB) : (color ?? Colors.white);
    final fg = selected ? Colors.white : (textColor ?? const Color(0xFF0F172A));
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(12),
        border: selected
            ? null
            : Border.all(color: borderColor ?? const Color(0xFFE2E8F0)),
        boxShadow: selected
            ? const [
                BoxShadow(
                    color: Color(0x1A3B82F6),
                    blurRadius: 10,
                    offset: Offset(0, 4))
              ]
            : const [
                BoxShadow(
                    color: Color(0x08000000),
                    blurRadius: 6,
                    offset: Offset(0, 2))
              ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 120),
            child: Text(
              label,
              overflow: TextOverflow.ellipsis,
              maxLines: 1,
              style: TextStyle(color: fg, fontWeight: FontWeight.w600),
            ),
          ),
          if (badge != null) ...[
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: badgeBgColor ?? Colors.white,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                badge!,
                style: TextStyle(
                  color: badgeTextColor ?? const Color(0xFF6B7280),
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                ),
              ),
            )
          ]
        ],
      ),
    );
  }
}

class _SegmentedTabs extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
            colors: [Color(0xFFF1F5F9), Color(0xFFEFF6FF)]),
        borderRadius: BorderRadius.circular(10),
      ),
      padding: const EdgeInsets.all(6),
      child: const Row(
        children: [
          _SegmentTab(label: 'Recent', selected: true),
          SizedBox(width: 8),
          _SegmentTab(label: 'Popular'),
          SizedBox(width: 8),
          _SegmentTab(label: 'Hazards'),
        ],
      ),
    );
  }
}

class _SegmentTab extends StatelessWidget {
  final String label;
  final bool selected;
  const _SegmentTab({required this.label, this.selected = false});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: selected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
          boxShadow: selected
              ? const [
                  BoxShadow(
                      color: Color(0x14000000),
                      blurRadius: 8,
                      offset: Offset(0, 3))
                ]
              : null,
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? const Color(0xFF0F172A) : const Color(0xFF64748B),
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}

class _TrendingSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF7FCFF), Color(0xFFF6FFFB)],
        ),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE6F0FA)),
        boxShadow: const [
          BoxShadow(
              color: Color(0x0F000000), blurRadius: 10, offset: Offset(0, 4))
        ],
      ),
      padding: const EdgeInsets.all(16),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.trending_up, color: Color(0xFF1ABA55)),
              SizedBox(width: 8),
              Text('Trending Now',
                  style: TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 16,
                      color: Colors.black)),
            ],
          ),
          SizedBox(height: 22),
          Row(
            children: [
              Expanded(
                  child: _TrendCard(
                      title: 'Rip Current\nSafety', posts: 15, growth: '+25%')),
              SizedBox(width: 12),
              Expanded(
                  child: _TrendCard(
                      title: 'Weather\nPatterns', posts: 23, growth: '+18%')),
            ],
          ),
          SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                  child: _TrendCard(
                      title: 'Marine Life\nAlerts', posts: 12, growth: '+45%')),
              SizedBox(width: 12),
              Expanded(
                  child: _TrendCard(
                      title: 'Beach\nConditions', posts: 31, growth: '+12%')),
            ],
          ),
        ],
      ),
    );
  }
}

class _TrendCard extends StatelessWidget {
  final String title;
  final int posts;
  final String growth;
  const _TrendCard(
      {required this.title, required this.posts, required this.growth});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFF2F8FF), Color(0xFFF0FFF7)],
        ),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE8F1FB)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: const TextStyle(
                  fontWeight: FontWeight.w700,
                  color: Color.fromARGB(255, 36, 36, 36))),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('$posts posts',
                  style:
                      const TextStyle(color: Color.fromARGB(255, 81, 85, 91))),
              Text(growth,
                  style: const TextStyle(
                      color: Color(0xFF1ABA55), fontWeight: FontWeight.w700)),
            ],
          ),
        ],
      ),
    );
  }
}

class _PostCard extends StatelessWidget {
  final String authorInitials;
  final String authorName;
  final String authorRole;
  final Widget categoryChip;
  final List<_MiniLabel> labels;
  final String timeAgo;
  final String location;
  final String title;
  final String excerpt;
  final List<String> tags;
  final int upvotes;
  final int comments;
  final int views;
  final Color? highlightColor;
  final bool isHighlighted;

  const _PostCard({
    required this.authorInitials,
    required this.authorName,
    required this.authorRole,
    required this.categoryChip,
    required this.labels,
    required this.timeAgo,
    required this.location,
    required this.title,
    required this.excerpt,
    required this.tags,
    required this.upvotes,
    required this.comments,
    required this.views,
    this.highlightColor,
    this.isHighlighted = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: highlightColor ?? Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE2E8F0)),
        boxShadow: const [
          BoxShadow(
              color: Color(0x08000000), blurRadius: 8, offset: Offset(0, 4))
        ],
      ),
      padding: EdgeInsets.all(isHighlighted ? 18 : 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _Avatar(initials: authorInitials),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                authorName,
                                style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                  color: isHighlighted
                                      ? Colors.black
                                      : const Color(0xFF0F172A),
                                ),
                              ),
                              SizedBox(height: isHighlighted ? 6 : 4),
                              Wrap(
                                spacing: 8,
                                runSpacing: 4,
                                children: [
                                  _RolePill(text: authorRole),
                                  if (labels.isNotEmpty)
                                    ...labels.map((e) => e),
                                ],
                              ),
                            ],
                          ),
                        ),
                        categoryChip,
                      ],
                    ),
                    SizedBox(height: isHighlighted ? 12 : 8),
                    Row(
                      children: [
                        const Icon(Icons.access_time,
                            size: 16, color: Color(0xFF94A3B8)),
                        const SizedBox(width: 6),
                        Text(timeAgo,
                            style: const TextStyle(color: Color(0xFF64748B))),
                        const SizedBox(width: 14),
                        const Icon(Icons.place,
                            size: 16, color: Color(0xFF94A3B8)),
                        const SizedBox(width: 6),
                        Text(location,
                            style: const TextStyle(color: Color(0xFF64748B))),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: isHighlighted ? 16 : 12),
          Text(
            title,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: isHighlighted ? Colors.black : const Color(0xFF0F172A),
            ),
          ),
          SizedBox(height: isHighlighted ? 12 : 8),
          Text(excerpt,
              style: const TextStyle(color: Color(0xFF475569), height: 1.4)),
          SizedBox(height: isHighlighted ? 14 : 10),
          Wrap(
            spacing: 8,
            runSpacing: -6,
            children: tags.map((t) => _HashTag(text: t)).toList(),
          ),
          SizedBox(height: isHighlighted ? 14 : 10),
          Row(
            children: [
              const Icon(Icons.arrow_upward,
                  size: 18, color: Color(0xFF94A3B8)),
              const SizedBox(width: 6),
              Text('$upvotes',
                  style: const TextStyle(color: Color(0xFF64748B))),
              const SizedBox(width: 16),
              const Icon(Icons.mode_comment_outlined,
                  size: 18, color: Color(0xFF94A3B8)),
              const SizedBox(width: 6),
              Text('$comments',
                  style: const TextStyle(color: Color(0xFF64748B))),
              const SizedBox(width: 16),
              const Icon(Icons.share_outlined,
                  size: 18, color: Color(0xFF94A3B8)),
              const Spacer(),
              const Icon(Icons.remove_red_eye_outlined,
                  size: 18, color: Color(0xFF94A3B8)),
              const SizedBox(width: 6),
              Text('$views', style: const TextStyle(color: Color(0xFF64748B))),
            ],
          )
        ],
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  final String initials;
  const _Avatar({required this.initials});

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: 20,
      backgroundColor: const Color(0xFFE2E8F0),
      child: Text(initials,
          style: const TextStyle(
              color: Color(0xFF334155), fontWeight: FontWeight.w700)),
    );
  }
}

class _RolePill extends StatelessWidget {
  final String text;
  const _RolePill({required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: const Color(0xFFF1F5F9),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(text,
          style: const TextStyle(
              color: Color(0xFF475569),
              fontSize: 12,
              fontWeight: FontWeight.w600)),
    );
  }
}

class _MiniLabel extends StatelessWidget {
  final String text;
  final Color color;
  const _MiniLabel({required this.text, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
          color: color.withValues(alpha: 0.15),
          borderRadius: BorderRadius.circular(8)),
      child: Text(text,
          style: TextStyle(
              color: color, fontSize: 12, fontWeight: FontWeight.w700)),
    );
  }
}

class _CategoryChip extends StatelessWidget {
  final String label;
  final Color color;
  const _CategoryChip({required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
          color: color.withValues(alpha: 0.15),
          borderRadius: BorderRadius.circular(10)),
      child: Text(label,
          style: TextStyle(color: color.darken(), fontWeight: FontWeight.w700)),
    );
  }
}

class _HashTag extends StatelessWidget {
  final String text;
  const _HashTag({required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Text('#$text', style: const TextStyle(color: Color(0xFF475569))),
    );
  }
}

extension on Color {
  Color darken([double amount = .2]) {
    assert(amount >= 0 && amount <= 1);
    final hsl = HSLColor.fromColor(this);
    final hslDark = hsl.withLightness((hsl.lightness - amount).clamp(0.0, 1.0));
    return hslDark.toColor();
  }
}
